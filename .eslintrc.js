module.exports = {
    "extends": "vue",
    "installedESLint": true,
    "plugins": [
        "standard",
        "promise",
        "html"
    ],
    "env": {
      "browser": true,
      "node": true
    },
    "rules": {
        "semi": ["error", "never"],
        "quotes": ["error", "single"]
    },
    "globals": {
      "Vue": true,
      "chrome": true
    }
};
