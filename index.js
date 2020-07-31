var mongoose = require("mongoose");
var url= (process.env.MONGO_URL) ? process.env.MONGO_URL : "mongodb://localhost:27017/tedconfigs"
mongoose.connect(url);
var Schema = mongoose.Schema;
var db = mongoose.connection;
var toolsSchema = new Schema({
    _id: { type: String },
    toolname: {
        type: String, required: true, unique: true,
        enum: ["jira", "github", "sonarqube", "saucelabs", "xray", "jenkins", "newrelic", "blazemeter",
            "qtest", "aws", "sealights", "trs", "ado"]
    },
    url: { type: String },
    username: { type: String },
    accessToken: { type: String },
    accessUsername: { type: String },
    password: { type: String },
    encryptionType: { type: String, default: "AES256", enum: ["Normal", "AES256"] },
    isActive: { type: Boolean, default: true },
    encryptionKey: { type: String }
});
toolsSchema.index({ toolname: 1 });
var toolsModel = mongoose.model("toolconfigs", toolsSchema);
var getToolConfig = function (toolname) {
    return new Promise((resolve, reject) => {
        mongoose.models['toolconfigs'].findOne({ toolname: toolname }, function (err, doc) {
            if (!err) {
                resolve(doc);
            } else {
                reject(err);
            }
        });
    })
};
module.exports.getToolConfig = getToolConfig;