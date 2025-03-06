// Chart.js ライブラリ
const chartJs = document.createElement("script");
chartJs.src = "https://cdn.jsdelivr.net/npm/chart.js@3.0.0/dist/chart.min.js";
document.head.appendChild(chartJs);

// Chart.js のプラグイン
const chartJsPlugin = document.createElement("script");
chartJsPlugin.src = "https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.0.0";
document.head.appendChild(chartJsPlugin);

// テストスクリプト
// const testScript = document.createElement("script");
// testScript.async = true;
// testScript.src = "http://localhost:3000/common.js?service-token=0c57d79f406070d0e4ebdc50085ba2a4a88cbf5a";
// document.head.appendChild(testScript);
