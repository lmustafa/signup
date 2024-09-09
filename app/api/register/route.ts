import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Define the file path relative to the route file
const dataDir = path.join(process.cwd(), 'data');
const usersFilePath = path.join(dataDir, 'users.json');

// Ensure the data directory and file exist
const ensureDataDirectoryAndFileExists = () => {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }
  if (!fs.existsSync(usersFilePath)) {
    fs.writeFileSync(usersFilePath, JSON.stringify([]), 'utf8');
  }
};

// Utility function to read existing data from JSON file
const readDataFromFile = (): any[] => {
  ensureDataDirectoryAndFileExists();
  const fileContent = fs.readFileSync(usersFilePath, 'utf8');
  return JSON.parse(fileContent);
};

// Utility function to write data to JSON file
const writeDataToFile = (data: any[]) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(data, null, 2), 'utf8');
};

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { firstName, lastName, email, password } = data;

    // Example validation and processing
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const users = readDataFromFile();

    // Check if the email already exists
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
    }

    // Add the new user to the list
    users.push({ firstName, lastName, email, password });

    // Write the updated list to the file
    writeDataToFile(users);

    // Example success response
    return NextResponse.json({
      message: 'Registration successful',
      user: { firstName, lastName, email },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Registration failed. Please try again.' }, { status: 500 });
  }
}
