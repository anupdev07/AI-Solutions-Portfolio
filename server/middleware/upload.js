const multer = require("multer");
const path = require("path");
const fs = require("fs");

function ensureDirSync(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function storageFor(type) {
  return multer.diskStorage({
    destination(req, file, cb) {
      // uploads/<type> relative to project root/server/uploads/<type>
      const uploadBase = path.join(__dirname, "..", "uploads");
      const dest = path.join(uploadBase, type);
      ensureDirSync(dest);
      cb(null, dest);
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname).toLowerCase();
      const safeName = file.fieldname.replace(/\s+/g, "-");
      const filename = `${safeName}-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
      cb(null, filename);
    },
  });
}

function imageFileFilter(req, file, cb) {
  const allowed = /jpeg|jpg|png|webp|gif/;
  const ext = path.extname(file.originalname).toLowerCase().replace(".", "");
  if (allowed.test(ext)) cb(null, true);
  else cb(new Error("Only image files are allowed (jpg, jpeg, png, webp, gif)"));
}

/**
 * uploadTo(type, options)
 * returns a multer instance configured to save files to uploads/<type>
 * usage in routes: uploadTo('blogs').single('coverImage'), uploadTo('events').array('images', 10)
 */
function uploadTo(type, options = {}) {
  const storage = storageFor(type);
  const limits = options.limits || { fileSize: 5 * 1024 * 1024 }; // default 5MB
  return multer({ storage, fileFilter: imageFileFilter, limits });
}

module.exports = { uploadTo };
