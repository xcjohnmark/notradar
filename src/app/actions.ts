"use server";

import fs from "fs/promises";
import path from "path";

export interface FormState {
  success: boolean;
  message: string;
  error?: string;
}

export async function joinWaitlist(
  prevState: FormState | null,
  formData: FormData
): Promise<FormState> {
  const email = formData.get("email")?.toString().trim();

  if (!email) {
    return {
      success: false,
      message: "Email is required.",
      error: "Email is required.",
    };
  }

  // Basic email regex validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      success: false,
      message: "Please enter a valid email address.",
      error: "Please enter a valid email address.",
    };
  }

  const filePath = path.join(process.cwd(), "waitlist.json");

  try {
    let waitlist: { email: string; timestamp: string }[] = [];

    // Check if the file exists and read it
    try {
      const fileData = await fs.readFile(filePath, "utf-8");
      waitlist = JSON.parse(fileData);
      if (!Array.isArray(waitlist)) {
        waitlist = [];
      }
    } catch (err: any) {
      // File doesn't exist yet, which is fine
      if (err.code !== "ENOENT") {
        console.error("Error reading waitlist.json:", err);
        return {
          success: false,
          message: "Internal server error. Please try again later.",
          error: "Failed to read waitlist file.",
        };
      }
    }

    // Check for duplicate emails
    const exists = waitlist.some(
      (entry) => entry.email.toLowerCase() === email.toLowerCase()
    );
    if (exists) {
      return {
        success: false,
        message: "You are already on the waitlist! We will notify you when we launch.",
        error: "Email already registered.",
      };
    }

    // Add new entry
    waitlist.push({
      email: email,
      timestamp: new Date().toISOString(),
    });

    // Write back to file
    await fs.writeFile(filePath, JSON.stringify(waitlist, null, 2), "utf-8");

    return {
      success: true,
      message: "Welcome to the edge! You have been added to the waitlist.",
    };
  } catch (error: any) {
    console.error("Error writing to waitlist.json:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
      error: error.message || "Failed to save email.",
    };
  }
}
