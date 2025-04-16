import nedb from 'gray-nedb';

class EnrolmentModel {
  constructor() {
    this.db = new nedb({ filename: './data/enrolments.db', autoload: true });
    console.log('Connected to enrolments DB');
  }

  getById(_id) {
    return new Promise((resolve, reject) => {
      this.db.findOne({ _id }, (err, doc) => {
        if (err) {
          reject(err);
          console.error('ERROR - enrolmentModel > getById(): ', err);
        } else {
          resolve(doc);
          console.log('enrolmentModel > getById(): ', doc);
        }
      });
    });
  }

  getByClassId(classId) {
    return new Promise((resolve, reject) => {
      this.db.find({ classId }, (err, docs) => {
        if (err) {
          reject(err);
          console.error('ERROR - enrolmentModel > getByClassId(): ', err);
        } else {
          resolve(docs);
          console.log('enrolmentModel > getByClassId(): ', docs);
        }
      });
    });
  }

  getByCourseId(courseId) {
    return new Promise((resolve, reject) => {
      this.db.find({ courseId }, (err, docs) => {
        if (err) {
          reject(err);
          console.error('ERROR - enrolmentModel > getByCourseId(): ', err);
        } else {
          resolve(docs);
          console.log('enrolmentModel > getByCourseId(): ', docs);
        }
      });
    });
  }

  insert(enrolment) {
    return new Promise((resolve, reject) => {
      this.db.insert(enrolment, (err, doc) => {
        if (err) {
          reject(err);
          console.error('ERROR - enrolmentModel > insert(): ', err);
        } else {
          resolve(doc);
          console.log('enrolmentModel > insert(): ', doc);
        }
      });
    });
  }

  delete(_id) {
    return new Promise((resolve, reject) => {
      this.db.remove({ _id }, {}, (err, numRemoved) => {
        if (err) {
          console.error('ERROR - enrolmentModel > delete(): ', err);
          reject(err);
        } else {
          console.log(
            `enrolmentModel > delete(): ${numRemoved} entries removed`
          );
          resolve(numRemoved);
        }
      });
    });
  }

  deleteByUserAndClass(name, classId) {
    return new Promise((resolve, reject) => {
      this.db.remove({ name, classId }, {}, (err, numRemoved) => {
        if (err) {
          console.error(
            'ERROR - enrolmentModel > deleteByUserAndClass(): ',
            err
          );
          reject(err);
        } else {
          console.log(
            `enrolmentModel > deleteByUserAndClass(): ${numRemoved} entries removed`
          );
          resolve(numRemoved);
        }
      });
    });
  }
}

export default EnrolmentModel;
