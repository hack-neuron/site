/* globals Chart:false, feather:false */

(function () {
  'use strict'

  feather.replace()

  var barChartData = {
    labels: ['Метрика 1', 'Метрика 2', 'Метрика 3', 'Метрика 4', 'Метрика 5', 'Метрика 6', 'Метрика 7'],
    datasets: [{
      label: 'Вес метрик',
      backgroundColor: '#ffe082',
      borderColor: '#ffca28',
      borderWidth: 1,
      data: [
        Math.random() * 10,
        Math.random() * 10,
        Math.random() * 10,
        Math.random() * 10,
        Math.random() * 10,
        Math.random() * 10,
        Math.random() * 10
      ]
    }]

  };

  // Graphs
  var ctx = document.getElementById('myChart')
  // eslint-disable-next-line no-unused-vars
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: barChartData,
    options: {
      responsive: true,
      legend: {
        // position: 'top',
        position: false
      },
      title: {
        display: true,
        text: 'Вес метрик'
      }
    }
  })
})()
