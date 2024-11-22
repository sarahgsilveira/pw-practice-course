// Import the 'fs' module to interact with the file system (e.g., to check, delete, and manipulate files)
const fs = require('fs');

// Import the 'path' module to work with file and directory paths in a platform-independent way
const path = require('path');

/*This imports Playwright's test and assertion library, enabling test case definitions and validation of expected outcomes.*/
import { test, expect } from '@playwright/test';

// Test Case
test('File Download Test: Jpeg_with_exif.jpeg', async ({ page }) => {
    /**
     * Test Suite: File Download
     * 
     * Test Case: Ensure Jpeg_with_exif.jpeg is downloaded successfully
     * 
     * Preconditions:
     * - The file `Jpeg_with_exif.jpeg` does not exist in the folder `C:\Users\Sarah\Downloads`.
     * - If the file exists, it is deleted before proceeding.
     * 
     * Steps:
     * 1. Navigate to the download page: https://the-internet.herokuapp.com/download
     * 2. Check if `Jpeg_with_exif.jpeg` exists in the download folder and delete it if present.
     * 3. Locate and click the download link for `Jpeg_with_exif.jpeg`.
     * 4. Wait for the file to download.
     * 5. Validate that the file is downloaded to `C:\Users\Sarah\Downloads`.
     * 
     * Expected Results:
     * - The file `Jpeg_with_exif.jpeg` is successfully downloaded and exists in the specified folder.
     */

    // Define file path and name
    const downloadsFolder = 'C:\\Users\\Sarah\\Downloads';
    const fileName = 'Jpeg_with_exif.jpeg';
    const filePath = path.join(downloadsFolder, fileName);

    // Step 1: Navigate to the download page
    await page.goto('https://the-internet.herokuapp.com/download');

    // Step 2: Check if file exists and delete it
    if (fs.existsSync(filePath)) {
        console.log('File exists. Deleting it now...');
        fs.unlinkSync(filePath); // Deletes the file
    }

    // Step 3: Set up download handling
    const [download] = await Promise.all([
        page.waitForEvent('download'), // Waits for the download event
        page.click('a:text("Jpeg_with_exif.jpeg")'), // Locates and clicks the link with text "Jpeg_with_exif.jpeg"
    ]);

    // Step 4: Save the file to the specified downloads folder
    await download.saveAs(filePath);

    // Step 5: Validate the file was downloaded successfully
    const fileDownloaded = fs.existsSync(filePath);
    console.log(`File downloaded: ${fileDownloaded}`);
    expect(fileDownloaded).toBeTruthy(); // Asserts the file exists
});
