"use server";

import { CreateUserParams, UpdateUserParams } from "@/types";
import { connectToDatabase } from "../database";
import { handleError } from "../utils";
import User from "../database/models/user.models";
import Order from "../database/models/order.models";
import Event from "../database/models/event.models";

// Create a new user
export async function createUser(user: CreateUserParams) {
  try {
    // Connect to the database and tries to cache the connection
    await connectToDatabase();

    // create a new user
    const newUser = await User.create(user);

    // return the new user
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    // custom error handling from utils
    handleError(error);
  }
}

// Update a user
export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    // Connect to the database and tries to cache the connection
    await connectToDatabase();

    // find a user by clerkId and update it
    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });

    // if the user is not found, throw an error
    if (!updatedUser) throw new Error("User update failed");

    // return the updated user
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
}

// Delete a user
export async function deleteUser(clerkId: string) {
  try {
    await connectToDatabase();

    // Find user to delete
    const userToDelete = await User.findOne({ clerkId });

    if (!userToDelete) {
      throw new Error("User not found");
    }

    // Unlink all relationships
    await Promise.all([
      // Update the 'events' collection to remove references to the user
      Event.updateMany(
        { _id: { $in: userToDelete.events } },
        { $pull: { organizer: userToDelete._id } }
      ),

      // Update the 'orders' collection to remove references to the user
      Order.updateMany(
        { _id: { $in: userToDelete.orders } },
        { $unset: { buyer: 1 } }
      ),
    ]);

    // Delete user
    const deletedUser = await User.findByIdAndDelete(userToDelete._id);

    // Revalidate the cache
    revalidatePath("/");

    // Return the deleted user
    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    handleError(error);
  }
}

// Get user by ID
export async function getUserById(userId: string) {
  try {
    // Connect to the database and tries to cache the connection
    await connectToDatabase();

    // find a user by ID
    const user = await User.findById(userId);

    // if the user is not found, throw an error
    if (!user) throw new Error("User not found");

    // return the user
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}
