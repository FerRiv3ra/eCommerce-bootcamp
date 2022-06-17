import path from 'path';
import generateToken from './generateToken';

// export const uploadFiles = (
//   files: any,
//   validExt = ["jpg", "jpeg", "png", "gif"],
//   folder = ""
// ) => {
//   return new Promise((resolve, reject) => {
//     const { file } = files;

//     const splitName = file.name.split(".");
//     const ext = splitName[splitName.length - 1];

//     if (!validExt.includes(ext)) {
//       return reject(`Extension ${ext} is no valid`);
//     }

//     const tempName = generateToken() + "." + ext;

//     const uploadPath = path.join(__dirname, "../uploads/", folder, tempName);

//     file.mv(uploadPath, (err) => {
//       if (err) {
//         return reject(err);
//       }

//       resolve(tempName);
//     });
//   });
// };

export const validFileExt = (
  files: any,
  validExt = ['jpg', 'jpeg', 'png', 'gif']
) => {
  return new Promise((resolve, reject) => {
    const { file } = files;

    const splitName = file.name.split('.');
    const ext = splitName[splitName.length - 1];

    if (!validExt.includes(ext)) {
      return reject(`Extension ${ext} is no valid`);
    }

    resolve(true);
  });
};
