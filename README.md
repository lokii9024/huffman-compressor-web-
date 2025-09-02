# 📦 Huffman Compression Tool

A modern web-based **file compression and decompression tool** built with **React**, using **Huffman coding**.  
Supports **text files** for compression and generates `.huff` compressed files that can be decompressed back to the original.  
Also provides **analytics** and a **visualization of the Huffman tree**.

---

## 🚀 Features

- 🔐 **Huffman Compression & Decompression**
  - Compresses text files into `.huff` format.
  - Decompresses `.huff` files back to the original text.

- 📊 **Analytics**
  - Shows original size, compressed size, compression ratio, and space saved.

- 🌳 **Huffman Tree Visualization**
  - Interactive tree rendered using `react-d3-tree`.
  - Labels edges with `0` and `1` for clarity.
  - Viewable in a **Material UI dialog popup**.

- 🎨 **Modern UI**
  - Built with **React + TailwindCSS + Material UI**.
  - Toast notifications using `react-toastify`.

---

## 📂 Project Structure

src/
├── components/
│ ├── HeroSection.jsx # Upload and select action (compress/decompress)
│ ├── HuffmanTree.jsx # Huffman tree visualization
│ ├── Navbar.jsx # Navigation bar
│
├── pages/
│ ├── GetStarted.jsx # Get started page
│ ├── Home.jsx # Landing page
│ ├── HowItWorks.jsx # Explanation page
│
├── utils/
│ ├── huffman.js # Huffman encoding/decoding helpers
│ ├── treeData.js # Builds tree data for visualization
│
├── App.js # Main app container


---

## ⚙️ Installation & Setup

```bash
# Clone the repo
git clone https://github.com/lokii9024/huffman-compressor-web-.git

# Go into the project
cd huffman-compressor-web-

# Install dependencies
npm install

# Run the development server
npm run dev

```

---

## 🖼️ Usage

1. **Upload a file**
   - For compression → Upload a `.txt` file.  
   - For decompression → Upload a `.huff` file.

2. **Choose Action**
   - Click **Compress** or **Decompress**.

3. **View Results**
   - Download the compressed or decompressed file.  
   - See analytics (original vs compressed size).  
   - Click **"Show Huffman Tree"** to visualize the coding structure.

---

## 📊 Example Analytics

| Metric            | Value |
|-------------------|-------|
| Original Size     | 12 KB |
| Compressed Size   | 6 KB  |
| Compression Ratio | 2:1   |
| Space Saved       | 50%   |

---

## 🛠️ Tech Stack

- **React**
- **Material UI**
- **React Toastify**
- **React D3 Tree**

---

## 📌 Future Improvements

- Support for **binary files** (PNG, PDF, etc.)  
- Multiple compression strategies (e.g., Run-Length Encoding)  
- Exportable Huffman tree diagram (PNG/SVG)  

---

## 👨‍💻 Author

Made with ❤️ by **[Lokesh Vaishnav]**

