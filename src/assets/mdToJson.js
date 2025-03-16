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

// Helper function to read markdown files and extract metadata
const getFilesMetadata = (folderPath, category) => {
  const files = fs.readdirSync(folderPath);
  const mdFiles = files.filter(file => path.extname(file) === '.md');
  
  const metadata = mdFiles.map((file) => {
    const filePath = path.join(folderPath, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const {data} = matter(fileContent); // Extract metadata from frontmatter
    
    return {
      category: data.category,
      name: data.name || file,
      title: data.title || "",
      time: data.time || "",
      description: data.description || "",
    };
  });
  
  return metadata;
};

// Function to generate the content.json file
const generateContentJson = () => {
  // Fetch metadata from articles, blogs, and projects folders
  const articlesMetadata = getFilesMetadata(articlesFolder, 'articles');
  const blogsMetadata = getFilesMetadata(blogsFolder, 'blogs');
  const projectsMetadata = getFilesMetadata(projectsFolder, 'projects');
  
  // Combine all metadata into a single array
  const allContentMetadata = [
    ...articlesMetadata,
    ...blogsMetadata,
    ...projectsMetadata,
  ];
  
  // Write the combined metadata to content.json
  fs.writeFileSync(outputFile, JSON.stringify(allContentMetadata, null, 2));
  console.log("content.json has been generated successfully!");
};

// Run the function to generate the content.json file
generateContentJson();
