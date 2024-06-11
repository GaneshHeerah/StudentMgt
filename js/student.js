fileInput.addEventListener("change", onFileChanged)
  
  function onFileChanged(event) {
    const fileList = event.target.files
    fileText.value = ""

    if (fileList.length === 0) {
      console.log("No file selected, please select one!")
      return
    }
    
    if (fileList.length > 1) {
      console.log("Too many files selected, please select only one!")
      return
    }
    
    // destruct first entry of fileList, equivalent to `const file = fileList[0]`
    const [file] = fileList
    
    // you can validate what type of file you accept
    if (file.type !== "text/plain") {
      console.log("Only text files are supported!")
      return
    }

    console.log("Reading file", file.name)
    readFile(file, printText)
  }
  
  function readFile(file, callback) {
    if (typeof callback !== "function") {
      throw new Error("Please supply a callback function to handle the read text!")
    }
    const reader = new FileReader()
    reader.addEventListener("load", function() {
      callback(reader.result)
    })
    return reader.readAsText(file)
  }
  
  function printText(text) {
    fileText.value = text
  }
  function readFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0]; // Get the first selected file
  
    if (file) {
      const reader = new FileReader();
  
      reader.onload = function(e) {
        const content = e.target.result;
        // Process the file content here (e.g., display, upload to server)
        console.log(content);
      };
  
      reader.readAsText(file); // Read the file content as text
    } else {
      console.error('No file selected');
    }
  }