let arrSize, arrString, arr;
let steps = [];
let currentStep = 0;
let sortedIndices = new Set();

// Code snippets for different languages
const codeSnippets = {
    c: [
        "void bubbleSort(int arr[], int n) {",
        "    int swapped = 0;",
        "    for (int i = 0; i < n - 1; i++) {",//line 2
        "        for (int j = 0; j < n - i - 1; j++) {",//line 3
        "            if (arr[j] > arr[j+1]) {",//line 4
        "                // swap arr[j] and arr[j+1]",
        "                int temp = arr[j];",
        "                arr[j] = arr[j+1];",
        "                arr[j+1] = temp;",//line 8
        "            }",
        "        }",
        "        if(swapped == 0) break;",//line 11
        "    }",
        "}"
    ],
    javascript: [
        "function bubbleSort(arr) {",
        "  let swapped = false;",
        "  for (let i = 0; i < arr.length - 1; i++) {",//line2
        "    for (let j = 0; j < arr.length - i - 1; j++) {",//line3
        "      if (arr[j] > arr[j+1]) {",//line4
        "        [arr[j], arr[j+1]] = [arr[j+1], arr[j]];",//line5
        "      }",
        "    }",
        "    if (!swapped) break;",//line8
        "  }",
        "}"
    ],
    python: [
        "def bubble_sort(arr):",
        "    n = len(arr)",
        "    for i in range(n - 1):",//line2
        "        swapped = False",
        "        for j in range(n - i - 1):",//line4
        "            if arr[j] > arr[j + 1]:",//line5
        "                arr[j], arr[j + 1] = arr[j + 1], arr[j]",//line6
        "                swapped = True",
        "        if not swapped:",//line8
        "            break",
        "    return arr"
    ],
    java: [
        "public class BubbleSort {",
        "    public static void bubbleSort(int[] arr) {",
        "        boolean swapped;",
        "        for (int i = 0; i < arr.length - 1; i++) {",//line3
        "            swapped = false;",
        "            for (int j = 0; j < arr.length - i - 1; j++) {",//line5
        "                if (arr[j] > arr[j + 1]) {",//line6
        "                    int temp = arr[j];",
        "                    arr[j] = arr[j + 1];",
        "                    arr[j + 1] = temp;",//line9
        "                    swapped = true;",
        "                }",
        "            }",
        "            if (!swapped) break;",//line13
        "        }",
        "    }",
        "}"
    ],
    cpp : [
        "void bubbleSort(int arr[], int n) {",
        "    bool swapped;",
        "    for (int i = 0; i < n - 1; i++) {",//line2
        "        swapped = false;",
        "        for (int j = 0; j < n - i - 1; j++) {",//line4
        "            if (arr[j] > arr[j + 1]) {",//line5
        "                std::swap(arr[j], arr[j + 1]);",//line6
        "                swapped = true;",
        "            }",
        "        }",
        "        if (!swapped) break;",//line10
        "    }",
        "}"
    ]
};

let currentLanguage = "c";

//keeping a mapping object for highlight line
const highlightMap = {
    c: {
        compare : 4 ,
        swap : 8,
        outerloop : 2,
        innerloop : 3,
        breakCheck : 11
    },
    javascript: {
        compare: 4,       
        swap: 5,          
        outerLoop: 2,     
        innerLoop: 3,
        breakCheck: 8     
    },
    python: {
        compare : 5,
        swap : 6,
        outerloop: 2,
        innerloop : 4,
        breakCheck : 8
    },
    java: {
        compare: 6,       
        swap: 9,          
        outerLoop: 3,     
        innerLoop: 5,
        breakCheck: 13     
    },
    cpp: {
        compare: 5,       
        swap: 6,          
        outerLoop: 2,     
        innerLoop: 4,
        breakCheck: 10     
    }
}

// Handle language change
document.getElementById("language-btn").addEventListener("click", () => {
    currentLanguage = document.getElementById("languageSelect").value;
    renderCodeSnippet(); 
});

function renderCodeSnippet(highlightLine = -1) {
    const codeBox = document.getElementById("codeSnippet");
    codeBox.innerHTML = "";
    codeSnippets[currentLanguage].forEach((line, idx) => {
        const div = document.createElement("div");
        div.textContent = line;
        if (idx === highlightLine ) {
            div.style.background = "yellow";
            div.style.color = "black";
            div.style.fontWeight = "bold";
        }
        codeBox.appendChild(div);
    });
}

document.getElementById("generateArray").addEventListener("click", () => {
    arrSize = parseInt(document.getElementById("arraySize").value, 10);
    arrString = document.getElementById("arrayElements").value;
    arr = arrString.split(",").map(num => parseInt(num.trim(), 10)).filter(num => !isNaN(num));

    if (arr.length !== arrSize) {
        let elementsNeeded = arrSize - arr.length;
        for (let i = 0; i < elementsNeeded; i++) {
            arr.push(Math.floor(Math.random() * 100));
        }
    }

    console.log("Size:", arrSize);
    console.log("Array:", arr);
    createBoxes();
    document.getElementById("arraySize").value = "";
    document.getElementById("arrayElements").value = "";
});

function createBoxes() {
    const container = document.getElementById("arrayVisualization");
    container.innerHTML = "";
    arr.forEach((value) => {
        const box = document.createElement("div");
        box.className = "box";
        box.textContent = value;
        container.appendChild(box);
    });
}

document.getElementById("prevStep").addEventListener("click", () => {
    if (currentStep > 0) {
        currentStep--;
        renderStep(currentStep);
    }
});

document.getElementById("nextStep").addEventListener("click", () => {
    if (currentStep < steps.length - 1) {
        currentStep++;
        renderStep(currentStep);
    }
});

function renderStep(stepIndex) {
    const boxes = document.querySelectorAll(".box");
    const step = steps[stepIndex];
    if(!step) return;
    // reset all boxes to default 
    step.array.forEach((val, i) => { 
        boxes[i].textContent = val; 
        boxes[i].style.backgroundColor = "#90caf9"; 
        boxes[i].style.color = "#0d47a1"; 
        boxes[i].style.border = "0.2rem solid #1565c0"; 
    });

    // Step comment logic 
    let comment = ""; 
    if (step.type === "compare") { 
        step.indices.forEach(i => { 
            boxes[i].style.backgroundColor = "yellow";
        });
        comment = `Comparing <b>${step.array[step.indices[0]]}</b> and <b>${step.array[step.indices[1]]}</b>.`; 
        
    } else if (step.type === "swap") { 
        step.indices.forEach(i => { 
            boxes[i].style.backgroundColor = "orange"; 
        }); 
        comment = `Swapped <b>${step.array[step.indices[1]]}</b> and <b>${step.array[step.indices[0]]}</b>.`; 
    } 
    else if (step.type === "markSorted") { 
        comment = `Marked <b>${step.array[step.index]}</b> as sorted.`; 
    } // Mark sorted elements up to this step 
    if (step.sortedSoFar) { 
        step.sortedSoFar.forEach(i => { 
            boxes[i].style.backgroundColor = "green"; 
            boxes[i].style.color = "white"; 
        }); 
    } // If last step => all green 
    if (stepIndex === steps.length - 1) { 
        boxes.forEach(b => { 
            b.style.backgroundColor = "green"; 
            b.style.color = "white"; 
        }); 
        comment = "Array is fully sorted!"; 
    } // Show comment 
    const commentDiv = document.getElementById("stepComment"); if (commentDiv) { commentDiv.innerHTML = comment; }
    renderCodeSnippet(step.highlightLine); // Highlight code line
    // Scroll to top of visualization
    const visualization = document.getElementById("arrayVisualization");
    visualization.scrollTo(0, 0);
}

function bubbleSort() {
    steps = []; 
    const n = arr.length; 
    let tempArr = [...arr]; 
    for (let i = 0; i < n - 1; i++) { 
        let swapped = false; 
        for (let j = 0; j < n - i - 1; j++) { 
            steps.push({ type: "compare", indices: [j, j + 1], array: [...tempArr], sortedSoFar: [] ,highlightLine: highlightMap[currentLanguage].compare}); 
            if (tempArr[j] > tempArr[j + 1]) { 
                [tempArr[j], tempArr[j + 1]] = [tempArr[j + 1], tempArr[j]]; 
                swapped = true; 
                steps.push({ type: "swap", indices: [j, j + 1], array: [...tempArr], sortedSoFar: [] , highlightLine : highlightMap[currentLanguage].swap}); 
            } 
        } // after each pass, last element is sorted 
        steps.push({ type: "markSorted", index: n - i - 1, array: [...tempArr], sortedSoFar: Array.from({ length: i + 1 }, (_, k) => n - 1 - k) , highlightLine: highlightMap[currentLanguage].outerLoop}); 
        if (!swapped) break; 
    } // mark first element sorted at the end 
    steps.push({ type: "markSorted", index: 0, array: [...tempArr], sortedSoFar: [...Array(n).keys()]  , highlightLine: highlightMap[currentLanguage].breakCheck}); 
    renderStep(0); 
}

document.getElementById("sortButton").addEventListener("click", () => {
    bubbleSort();
});
