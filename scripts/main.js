document.addEventListener("DOMContentLoaded", function () {
    const calculateBtn = document.getElementById("calculateBtn");
    if (calculateBtn) {
        calculateBtn.disabled = false;
        calculateBtn.addEventListener("click", calculate);
    }
});

// グローバルにグラフオブジェクトを保持
let pieChart;

// Chart.js のプラグインを有効化
Chart.register(ChartDataLabels);

function calculate() {
    const cacaoAmount = Number(document.getElementById("cacaoAmount").value);
    const cacaoPercent = Number(document.getElementById("cacaoPercent").value);
    const otherPercent = Number(document.getElementById("otherPercent").value);
    const cacaoButterPercent = Number(document.getElementById("cacaoButterPercent").value);

    if (cacaoAmount <= 0 || cacaoPercent <= 0 || cacaoPercent > 100 || otherPercent < 0 || cacaoButterPercent < 0) {
        alert("入力値を正しく設定してください。");
        return;
    }

    const gramsPerPercent = cacaoAmount / (cacaoPercent - otherPercent / (100 / cacaoButterPercent));
    const resultCacaoAmount = parseFloat((gramsPerPercent * (cacaoPercent - otherPercent / (100 / cacaoButterPercent))).toFixed(2));
    const resultCacaoButter = parseFloat((gramsPerPercent * (otherPercent / (100 / cacaoButterPercent))).toFixed(2));
    const resultSugarAmount = parseFloat((gramsPerPercent * (100 - ((cacaoPercent - otherPercent / (100 / cacaoButterPercent)) + (otherPercent / (100 / cacaoButterPercent)) + otherPercent))).toFixed(2));
    const resultOtherAmount = parseFloat((gramsPerPercent * otherPercent).toFixed(2));
    const resultTotal = resultCacaoAmount + resultCacaoButter + resultSugarAmount + resultOtherAmount;

    let resultHTML = `
        <table border="1" cellspacing="0" cellpadding="5">
            <tr><th>カカオ（g）</th><th>カカオバター（g）</th><th>砂糖（g）</th><th>その他（g）</th><th>合計（g）</th></tr>
            <tr>
                <td>${resultCacaoAmount}</td>
                <td>${resultCacaoButter}</td>
                <td>${resultSugarAmount}</td>
                <td>${resultOtherAmount}</td>
                <td>${resultTotal}</td>
            </tr>
        </table>
    `;

    document.getElementById("result").innerHTML = resultHTML;

    let ctx = document.getElementById('resultPieChart').getContext('2d');
    if (pieChart) {
        pieChart.destroy();
    }

    pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['カカオ', 'カカオバター', '砂糖', 'その他'],
            datasets: [{
                data: [resultCacaoAmount, resultCacaoButter, resultSugarAmount, resultOtherAmount],
                backgroundColor: ['#7D5A50', '#B4846C', '#E5B299', '#FCDEC0'],
            }]
        },
        plugins: [ChartDataLabels],
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            const label = tooltipItem.label || '';
                            const value = tooltipItem.raw || 0;
                            const total = tooltipItem.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(2);
                            return `${label}: ${value}g (${percentage}%)`;
                        }
                    }
                },
                datalabels: {
                    color: '#FFF',
                    font: { size: 14, weight: 'bold' },
                    textAlign: "center",
                    formatter: function (value, context) {
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = ((value / total) * 100).toFixed(2);
                        return `${percentage}%`;
                    }
                }
            }
        }
    });
}
