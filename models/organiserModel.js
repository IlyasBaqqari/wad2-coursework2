import nedb from 'gray-nedb';
import bcrypt from 'bcrypt';

const saltRounds = 10;

class OrganiserModel {
  constructor() {
    this.db = new nedb({ filename: './data/organisers.db', autoload: true });
    console.log('Connected to organisers DB');
  }

  getAll() {
    return new Promise((resolve, reject) => {
      this.db.find({}, (err, docs) => {
        if (err) {
          reject(err);
          console.error('ERROR - organiserModel > getAll(): ', err);
        } else {
          resolve(docs);
          console.log('organiserModel > getAll(): ', docs);
        }
      });
    });
  }

  getByUsername(username) {
    return new Promise((resolve, reject) => {
      this.db.findOne({ username }, (err, doc) => {
        if (err) {
          reject(err);
          console.error('ERROR - organiserModel > getByUsername(): ', err);
        } else {
          resolve(doc);
          console.log('organiserModel > getByUsername(): ', doc);
        }
      });
    });
  }

  async verifyPassword(username, plainTextPassword) {
    const organiser = await this.getByUsername(username);
    if (!organiser) {
      return false;
    }

    return bcrypt.compare(plainTextPassword, organiser.password);
  }

  async insert(organiser) {
    const { username, password } = organiser;

    const hash = await bcrypt.hash(password, saltRounds);
    return new Promise((resolve, reject) => {
      this.db.insert({ username, password: hash }, (err, doc) => {
        if (err) {
          reject(err);
          console.error('ERROR - organiserModel > insert(): ', err);
        } else {
          resolve(doc);
          console.log('organiserModel > insert(): ', doc);
        }
      });
    });
  }

  async delete(_id) {
    return new Promise((resolve, reject) => {
      this.db.remove({ _id }, {}, (err, numRemoved) => {
        if (err) {
          reject(err);
          console.error('ERROR - organiserModel > delete(): ', err);
        } else {
          resolve(numRemoved);
          console.log(
            `organiserModel > delete(): ${numRemoved} entries removed`
          );
        }
      });
    });
  }
}

export default OrganiserModel;
