import nedb from 'gray-nedb';
import bcrypt from 'bcrypt';

const saltRounds = 10;

class OrganiserModel {
  constructor() {
    this.db = new nedb({ filename: './data/organisers.db', autoload: true });
    console.log('Connected to organisers DB');
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

  async verifyPassword(username, plainTextPassword) {
    const organiser = await this.getByUsername(username);
    if (!organiser) {
      return false;
    }

    return bcrypt.compare(plainTextPassword, organiser.password);
  }
}

export default OrganiserModel;
