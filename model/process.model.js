const mongoose = require("mongoose");
// const { TaskSchema } = require("./task.model");

const ProcessSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task"
      }
    ]
  },
  { timestamps: true }
);

ProcessSchema.pre("save", function(next) {
  let titleArray = this.title.split(" ");
  titleArray = titleArray.map(title => {
    //capitalize the first letters
    return title.charAt(0).toUpperCase() + title.slice(1);
  });
  this.title = titleArray.join(" ").toString();
  next();
});

module.exports = mongoose.model("Process", ProcessSchema);
