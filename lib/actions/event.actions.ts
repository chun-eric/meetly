"use server";

import { CreateEventParams } from "@/types"; // Add import statement
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import User from "../database/models/user.models";
import Event from "../database/models/event.models";

export const createEvent = async ({
  event,
  userId,
  path,
}: CreateEventParams) => {
  try {
    await connectToDatabase();

    const organizer = await User.findById(userId);

    if (!organizer) {
      throw new Error("Organizer not found");
    }

    console.log({
      categoryId: event.categoryId,
      organizerId: userId,
    });

    const newEvent = await Event.create({
      ...event,
      category: event.categoryId,
      organizer: userId,
    });

    return JSON.parse(JSON.stringify(newEvent));
  } catch (error) {
    console.log(error);
    handleError(error);
  }
};
