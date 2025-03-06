// グローバルにグラフオブジェクトを保持
let pieChart;

function calculate() {
    const cacaoAmount = Number(document.getElementById("cacaoAmount").value);
    const cacaoPercent = Number(document.getElementById("cacaoPercent").value);
    const otherPercent = Number(document.getElementById("otherPercent").value);
    const cacaoButterPercent = Number(document.getElementById("cacaoButterPercent").value);

    const gramsPerPercent = cacaoAmount / (cacaoPercent - otherPercent / (100 / cacaoButterPercent));
    const resultCacaoAmount = gramsPerPercent * (cacaoPercent - otherPercent / (100 / cacaoButterPercent));
    const resultCacaoButter = gramsPerPercent * (otherPercent / (100 / cacaoButterPercent));
    const resultSugarAmount = gramsPerPercent * (100 - ((cacaoPercent - otherPercent / (100 / cacaoButterPercent)) + (otherPercent / (100 / cacaoButterPercent)) + otherPercent));
    const resultOtherAmount = gramsPerPercent * otherPercent;
    const resultTotal = resultCacaoAmount + resultCacaoButter + resultSugarAmount + resultOtherAmount;

    let resultHTML = `
        <table border="1" cellspacing="0" cellpadding="5">
            <tr><th>カカオ（g）</th><th>カカオバター（g）</th><th>砂糖（g）</th><th>その他（g）</th><th>合計（g）</th></tr>
            <tr>
                <td>${resultCacaoAmount.toFixed(2)}</td>
                <td>${resultCacaoButter.toFixed(2)}</td>
                <td>${resultSugarAmount.toFixed(2)}</td>
                <td>${resultOtherAmount.toFixed(2)}</td>
                <td>${resultTotal.toFixed(2)}</td>
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
                data: [
                    resultCacaoAmount.toFixed(2),
                    resultCacaoButter.toFixed(2),
                    resultSugarAmount.toFixed(2),
                    resultOtherAmount.toFixed(2)
                ],
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
                        label: function(tooltipItem) {
                            const label = tooltipItem.label || '';
                            const value = tooltipItem.raw || 0;
                            const total = tooltipItem.dataset.data.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
                            const percentage = ((value / total) * 100).toFixed(2);
                            return `${label}: ${value}g (${percentage}%)`;
                        }
                    }
                },
                datalabels: {
                    color: '#FFF',
                    font: { size: '14px', weight: 'bold' },
                    textAlign: "center",
                    formatter: function(value, context) {
                        const amount = context.dataset.data[context.dataIndex] || 0;
                        const total = context.dataset.data.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
                        const percentage = ((amount / total) * 100).toFixed(2);
                        return context.chart.data.labels[context.dataIndex] + '\n' + `${percentage}%`;
                    }
                }
            }
        }
    });
}
