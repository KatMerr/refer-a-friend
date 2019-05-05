const cloudinary = require('cloudinary').v2;
const formidable = require('formidable');

function removeExtension(name){
    return name.slice(0, name.lastIndexOf('.'));
}

exports.addImage = function(req, res){
    new formidable.IncomingForm().parse(req, (err, fields, files) => {
        if (err) {
          console.error('Error', err);
          throw err;
        }

        const path = files.image.path;
        
        cloudinary.uploader.upload(path, {
            resource_type: "image",
        }, function(error, result) {
            res.json(result);
        });
      })
}

exports.deleteImage = function(req, res){
    const { publicID } = req.params;
    if (publicID){
        cloudinary.uploader.destroy(publicID, (err, result) => {
            if (err) res.status(500).send(err);
            else res.json(result);
        });
    } else {
        res.status(500).send("No Image ID supplied");
    }
}