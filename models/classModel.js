import nedb from 'gray-nedb';

class ClassModel {
  constructor() {
    this.db = new nedb({ filename: './data/classes.db', autoload: true });
    console.log('Connected to classes DB');
  }

  getAll() {
    return new Promise((resolve, reject) => {
      this.db.find({}, (err, docs) => {
        if (err) {
          reject(err);
          console.error('ERROR - classModel > getAll(): ', err);
        } else {
          resolve(docs);
          console.log('classModel > getAll(): ', docs);
        }
      });
    });
  }

  getById(id) {
    return new Promise((resolve, reject) => {
      this.db.findOne({ _id: id }, (err, doc) => {
        if (err) {
          reject(err);
          console.error('ERROR - classModel > getById(): ', err);
        } else {
          resolve(doc);
          console.log('classModel > getById(): ', doc);
        }
      });
    });
  }

  getAllByCourseId(courseId) {
    return new Promise((resolve, reject) => {
      this.db.find({ courseId }, (err, doc) => {
        if (err) {
          reject(err);
          console.error('ERROR - classModel > getAllByCourseId(): ', err);
        } else {
          resolve(doc);
          console.log('classModel > getAllByCourseId(): ', doc);
        }
      });
    });
  }

  insert(newClass) {
    return new Promise((resolve, reject) => {
      this.db.insert(newClass, (err, doc) => {
        if (err) {
          reject(err);
          console.error('ERROR - classModel > insert(): ', err);
        } else {
          resolve(doc);
          console.log('classModel > insert(): ', doc);
        }
      });
    });
  }

  update(id, updatedClass) {
    return new Promise((resolve, reject) => {
      this.db.update(
        { _id: id },
        { $set: updatedClass },
        {},
        (err, numUpdated) => {
          if (err) {
            reject(err);
            console.error('ERROR - classModel > update(): ', err);
          } else {
            resolve(numUpdated);
            console.log(`classModel > update(): ${numUpdated} entries updated`);
          }
        }
      );
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      this.db.remove({ _id: id }, {}, (err, numRemoved) => {
        if (err) {
          reject(err);
          console.error('ERROR - classModel > delete(): ', err);
        } else {
          resolve(numRemoved);
          console.log(`classModel > delete(): ${numRemoved} entries removed`);
        }
      });
    });
  }
}

export default ClassModel;
