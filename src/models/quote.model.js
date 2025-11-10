import { Schema } from "mongoose";
import mongoose from "mongoose";

const QuoteDataSchema = new Schema(
  {
    user_ID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    text: {
      type: String,
      required: [true, "quotes are required"],
    },

    author: {
      type: String,
      required: [true, "author is required"],
    },

    tags: [String],
  },
  { timestamps: true }
);

export const quotes_data = mongoose.model("Quote", QuoteDataSchema);
