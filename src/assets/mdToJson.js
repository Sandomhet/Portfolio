const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Define folder paths for articles, blogs, and projects
const markdownFolder = path.join(__dirname, '../../public/markdown');
// Define the output file where the JSON data will be saved
const outputFile = path.join(__dirname, 'mdStorage.json');
const mapFile = path.join(__dirname, 'mdMap.json');

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
        name: entry.name.slice(0, -3),
        // path: path.join(folderPath, entry.name),
        path: `/markdown/${type}${category ? `/${category}` : ""}/${entry.name}`,
        title: data.title || entry.name.slice(0, -3),
        description: data.description || "description",
        time: data.time || "Mon Jan 1, 2024",
        lang: data.lang || "zh",
      })
    }
  })
  return metadata.sort((a, b) => new Date(b.time) - new Date(a.time));
}

// Function to generate the content.json file
const generateContentJson = () => {
  const allContentMetadata = getFilesMetadata(markdownFolder, "", "");
  const allContentMapdata = allContentMetadata.reduce((acc, entry) => {
    acc[entry.name] = entry;
    return acc;
  }, {});
  
  
  // Write the combined metadata to content.json
  fs.writeFileSync(outputFile, JSON.stringify(allContentMetadata, null, 2));
  fs.writeFileSync(mapFile, JSON.stringify(allContentMapdata, null, 2));
  console.log("content.json has been generated successfully!");
};

// Run the function to generate the content.json file
generateContentJson();
