const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Define folder paths for articles, blogs, and projects
const markdownFolder = path.join(__dirname, '../../public/markdown');
const articlesFolder = path.join(markdownFolder, 'articles');
const blogsFolder = path.join(markdownFolder, 'blogs');
const projectsFolder = path.join(markdownFolder, 'projects');
// Define the output file where the JSON data will be saved
const outputFile = path.join(__dirname, 'mdStorage.json');

// const getFilesRecursively = (folderPath) => {
//   let files = [];
//   console.log(folderPath);
//   fs.readdirSync(folderPath, {withFileTypes: true}).forEach((entry) => {
//     const entryPath = path.join(folderPath, entry.name);
//     if (entry.isDirectory()) {
//       // If it's a folder, scan recursively
//       files = [...files, ...getFilesRecursively(entryPath)];
//     } else if (entry.isFile() && path.extname(entry.name) === ".md") {
//       // If it's a markdown file, add it to the list
//       files.push(entryPath);
//     }
//   });
//   return files;
// };
// Helper function to read markdown files and extract metadata
// const getFilesMetadata = (folderPath, type) => {
//   const files = getFilesRecursively(folderPath);
//
//   return files.map((file) => {
//     const fileContent = fs.readFileSync(file, 'utf-8');
//     const {data} = matter(fileContent); // Extract metadata from frontmatter
//
//     return {
//       type: type,
//       name: data.name || file.name,
//       title: data.title || "",
//       time: data.time || " ",
//       description: data.description || " ",
//     };
//   });
// };
const getFilesMetadata = (folderPath, type, category) => {
  let metadata = [];
  fs.readdirSync(folderPath, {withFileTypes: true}).forEach((entry) => {
    const entryPath = path.join(folderPath, entry.name);
    if (entry.isDirectory()) {
      if (type === "") metadata = [...metadata, ...getFilesMetadata(entryPath, entry.name, category)];
      else metadata = [...metadata, ...getFilesMetadata(entryPath, type, entry.name)];
    } else if (entry.isFile() && path.extname(entry.name) === ".md") {
      const fileContent = fs.readFileSync(entryPath, 'utf-8');
      const {data} = matter(fileContent);
      
      metadata.push({
        type: type,
        category: category,
        name: entry.name,
        path: path.join(folderPath, entry.name),
        title: data.title || entry.name,
        description: data.description || "description",
        time: data.time || "Mon Jan 1, 2024",
      })
    }
  })
  return metadata;
}

// Function to generate the content.json file
const generateContentJson = () => {
  // // Fetch metadata from articles, blogs, and projects folders
  // const articlesMetadata = getFilesMetadata(articlesFolder, 'articles');
  // const blogsMetadata = getFilesMetadata(blogsFolder, 'blogs');
  // const projectsMetadata = getFilesMetadata(projectsFolder, 'projects');
  //
  // // Combine all metadata into a single array
  // const allContentMetadata = [
  //   ...articlesMetadata,
  //   ...blogsMetadata,
  //   ...projectsMetadata,
  // ];
  const allContentMetadata = getFilesMetadata(markdownFolder, "", "");
  
  // Write the combined metadata to content.json
  fs.writeFileSync(outputFile, JSON.stringify(allContentMetadata, null, 2));
  console.log("content.json has been generated successfully!");
};

// Run the function to generate the content.json file
generateContentJson();
