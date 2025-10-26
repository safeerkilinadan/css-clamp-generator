
## 🧩 Clamp Function Generator

**A modern web tool to generate perfect `clamp()` values for responsive CSS typography.**
Easily calculate fluid font sizes between any two viewport ranges — with live preview, copy functionality, and customizable base font size.

---

### 🚀 Live Demo

👉 **[View on GitHub Pages](https://safeerkilinadan.github.io/css-clamp-generator/)**

---

### ✨ Features

✅ Instantly generate accurate CSS `clamp()` expressions
✅ Adjust **min/max font size** and **viewport range**
✅ Toggle between **px / rem** units
✅ Define a custom **Base Value** (root font size) that works for *both* px and rem modes
✅ Live **preview** that visually scales as you type
✅ One-click **copy to clipboard**
✅ Beautiful teal gradient UI — responsive and mobile-friendly

---

### 🖼️ Preview

*(Add your screenshot here)*

```
📸 Screenshot: clamp-function-generator-preview.png
```

---

### 📂 Project Structure

```
clamp-function-generator/
│
├── index.html        # Main HTML interface
├── style.css         # Styling for layout and theme
└── script.js         # Core logic for clamp calculation and UI interactivity
```

---

### ⚙️ How It Works

The generator calculates a CSS `clamp()` value using a linear scaling formula based on your inputs.

```js
clamp(
  minValue,
  baseValue + slope * vw,
  maxValue
)
```

#### 🧠 Parameters:

| Parameter        | Description                                                             |
| ---------------- | ----------------------------------------------------------------------- |
| **Min Size**     | Minimum font size (px or rem)                                           |
| **Max Size**     | Maximum font size (px or rem)                                           |
| **Min Viewport** | Minimum viewport width in px                                            |
| **Max Viewport** | Maximum viewport width in px                                            |
| **Base Value**   | The root font size — used in both px and rem modes (e.g., 10px or 16px) |

---

### 🔍 Example Outputs

#### ➤ Using **rem mode** (Base = 10)

```
Min = 31, Max = 44, Viewport = 600–1440
→ clamp(3.100rem, 2.171rem + 1.548vw, 4.400rem)
```

#### ➤ Using **px mode** (Base = 10)

```
Min = 31, Max = 44, Viewport = 600–1440
→ clamp(31.000px, 21.710px + 1.548vw, 44.000px)
```

#### ➤ Using **Base = 16** (in rem mode)

```
Min = 32, Max = 48, Viewport = 600–1440, Base = 16
→ clamp(2.000rem, 1.167rem + 1.111vw, 3.000rem)
```

Both `px` and `rem` outputs represent the *same scaling behavior*, ensuring visual consistency across unit systems.

---

### 🛠️ Local Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/clamp-function-generator.git
   ```

2. **Open the project folder**

   ```bash
   cd clamp-function-generator
   ```

3. **Launch locally**
   Just open `index.html` in your browser — no build process required.

---

### 🧰 Tech Stack

* **HTML5** — Semantic structure
* **CSS3** — Clean teal-gradient responsive styling
* **Vanilla JavaScript (ES6)** — Functional and modular logic
* **Clipboard API** — One-click copy feature

---

### ❤️ Credits

Created and designed by **[Safeer Kilinadan](https://github.com/yourusername)**
Made with 💙 for frontend developers who love clean, responsive typography.

---

### 📜 License

**MIT License** — free to use, modify, and share.

---