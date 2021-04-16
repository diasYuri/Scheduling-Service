import path from 'path'
import crypto from 'crypto'
import multer from 'multer'

export default {

  storeage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'temp'), filename(req, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('HEX')
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName)
    }
  })


}
