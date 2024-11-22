// Import the 'fs' module to interact with the file system (e.g., to check, delete, and manipulate files)
const fs = require('fs');

// Import the 'path' module to work with file and directory paths in a platform-independent way
const path = require('path');

/*This imports Playwright's test and assertion library, enabling test case definitions and validation of expected outcomes.*/
import { test, expect } from '@playwright/test';

test('Download Files by Type', async ({ page }) => {
    /**
     * Test Suite: File Download by Type
     * 
     * Test Case: Ensure the first file of each type is downloaded successfully
     * 
     * Preconditions:
     * - The file directory `C:\Users\Sarah\Downloads` exists.
     * - Files with the targeted names are deleted if they already exist in the directory.
     * 
     * Steps:
     * 1. Navigate to the page: https://the-internet.herokuapp.com/download.
     * 2. Find the first link for each file type (JPEG, TXT, PDF, JSON, JAVA, BIN, PNG).
     * 3. Delete the file if it already exists in the folder.
     * 4. Click the link to download the file.
     * 5. Save the file in the specified directory.
     * 6. Verify the file exists in the target folder.
     * 
     * Expected Results:
     * - Each file (JPEG, TXT, PDF, JSON, JAVA, BIN, PNG) is successfully downloaded.
     */

    // File types to target and their extensions
    const fileTypes = ['jpeg', 'txt', 'pdf', 'json', 'java', 'bin', 'png'];
    const downloadsFolder = 'C:\\Users\\Sarah\\Downloads';

    // Navigate to the page
    await page.goto('https://the-internet.herokuapp.com/download');

    for (const fileType of fileTypes) {
        // Find the first file link for the given file type
        const fileLinkLocator = `a[href$=".${fileType}"]`;
        const fileLink = await page.locator(fileLinkLocator).first();
        const fileName = await fileLink.textContent();
        const filePath = path.join(downloadsFolder, fileName.trim());

        // Check if file exists and delete it
        if (fs.existsSync(filePath)) {
            console.log(`File ${fileName} exists. Deleting it now...`);
            fs.unlinkSync(filePath);
        }

        // Set up download handling and click the file link
        const [download] = await Promise.all([
            page.waitForEvent('download'),
            fileLink.click(),
        ]);

        // Save the file in the specified folder
        await download.saveAs(filePath);

        // Validate the file was downloaded successfully
        const fileDownloaded = fs.existsSync(filePath);
        console.log(`File downloaded: ${fileName.trim()} - ${fileDownloaded}`);
        expect(fileDownloaded).toBeTruthy(); // Assert the file exists
    }
});
