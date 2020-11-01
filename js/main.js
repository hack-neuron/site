
feather.replace()

// var barChartData = {
//     labels: ['Метрика 1', 'Метрика 2', 'Метрика 3', 'Метрика 4', 'Метрика 5', 'Метрика 6', 'Метрика 7'],
//     datasets: [{
//         label: 'Вес метрик',
//         backgroundColor: '#ffe082',
//         borderColor: '#ffca28',
//         borderWidth: 1,
//         data: [
//             Math.random() * 10,
//             Math.random() * 10,
//             Math.random() * 10,
//             Math.random() * 10,
//             Math.random() * 10,
//             Math.random() * 10,
//             Math.random() * 10
//         ]
//     }]

// };

barChartData = {
    labels: [],
    datasets: []
}

// Graphs
var ctx = document.getElementById('uploadChart')
// eslint-disable-next-line no-unused-vars
window.myChart = new Chart(ctx, {
    type: 'bar',
    data: barChartData,
    options: {
        responsive: true,
        legend: {
            // position: 'top',
            position: false
        },
        // title: {
        //     display: false,
        //     text: 'Вес метрик'
        // }
    }
})

var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJuYW1lIjoiYXBwX3NpdGUiLCJ0aW1lIjoxNjA0MTcxNjI0fQ.MUWldES0QLd2Uz0OXq2HWDk0Fj3H7kP3az2qn3x18W-mrRrS63Qme2f4kpS6Pe6wHKcbDKfLZWLLadG4EVOvSGBmHts6SJrkV3K2dG0hG5HzUiW30caH4mIR0-IrVTut1_OL6wSUdGGPL3LGG6NPWU36cpX_-LKfvh6u7gttOSI'


var uploadForm = document.getElementById('upload-form');
var step1 = document.getElementById('upload-step-1');
var step2 = document.getElementById('upload-step-2');
var step3 = document.getElementById('upload-step-3');
// var stepError = document.getElementById('step-error');
// var errorText = document.getElementById('error-text');
// var trainDataVolume = document.getElementById('train-data-volume');
// var accuracy = document.getElementById('accuracy');
// var testDataVolume = document.getElementById('test-data-volume');
// var valAccuracy = document.getElementById('val-accuracy');
var uploadResult = document.getElementById('uploadResult');
// var progress = document.getElementById('progress');
// var newFitBtns = document.getElementsByClassName('new-fit');
// var getFit = document.getElementById('get-fit');

uploadForm.addEventListener('submit', function (event) {
    event.preventDefault();
    event.stopPropagation();

    var formData = new FormData(uploadForm);

    step1.classList.add('d-none');
    step2.classList.remove('d-none');

    // window.setTimeout(function () {
    //     step2.classList.add('d-none');
    //     step3.classList.remove('d-none');
    // }, 2000);

    fetch('https://api.neuramark.ru/upload?token=' + token, {
        method: 'POST',
        body: formData
    }).then(
        response => response.json()
    ).then(
        json => {
            console.log(json);
            var id = json.id;
            var i = setInterval(() => {
                fetch('https://api.neuramark.ru/get_status?id_=' + id + '&token=' + token, {
                    method: 'GET'
                }).then(
                    response => response.json()
                ).then(
                    json => {
                        switch (json.state) {
                            case 'PROGRESS': {
                                // var percent = (json.current / (json.total / 100)).toFixed(2);
                                // progress.innerText = percent + '%';
                                // progress.setAttribute('aria-valuenow', percent);
                                // progress.style.width = percent + '%';
                                console.log(json.state)
                                break;
                            }
                            case 'SUCCESS': {
                                clearInterval(i);

                                // trainDataVolume.innerText = json.result.train_data_volume;
                                // accuracy.innerText = (json.result.accuracy * 100).toFixed(2) + '%';
                                // testDataVolume.innerText = json.result.test_data_volume;
                                // valAccuracy.innerText = (json.result.val_accuracy * 100).toFixed(2) + '%';

                                // fetch('/get_fit_model', {
                                //     method: 'POST',
                                //     body: JSON.stringify({ 'fit_id': fitId })
                                // }).then(
                                //     response => response.json()
                                // ).then(
                                //     json => {
                                //         getFit.setAttribute('href', json.url);
                                //     }
                                // );

                                step2.classList.add('d-none');
                                step3.classList.remove('d-none');

                                var percent = (json.result.rating * 20).toFixed(2);
                                uploadResult.innerText = percent + '%';
                                uploadResult.setAttribute('aria-valuenow', json.result.rating);
                                uploadResult.style.width = percent + '%';

                                barChartData.labels = json.result.labels || Array.from(json.result.metrics.keys())
                                var dataset = {
                                    backgroundColor: '#ffe082',
                                    borderColor: '#ffca28',
                                    borderWidth: 1,
                                    data: json.result.metrics
                                }
                                barChartData.datasets = [dataset]
                                window.myChart.update();

                                console.log(json.result)
                                break;
                            }
                            // case 'FAILURE': {
                            //     clearInterval(i);
                            //     errorText.innerText = (json.error_text);
                            //     step2.classList.add('d-none');
                            //     stepError.classList.remove('d-none');
                            //     break;
                            // }
                        };
                    }
                );
            }, 1000)
        }
    );

}, false);

// for (const btn of newFitBtns) {
//     btn.addEventListener('click', function (event) {
//         event.preventDefault();
//         event.stopPropagation();

//         step1.classList.remove('d-none');
//         step2.classList.add('d-none');
//         step3.classList.add('d-none');
//         stepError.classList.add('d-none');
//         progress.setAttribute('aria-valuenow', 0);
//         progress.style.width = 0 + '%';
//     }, false);
// };

// var uploadForm = document.getElementById('upload-form');
// var uploadStep1 = document.getElementById('upload-step-1');
// var uploadStep2 = document.getElementById('upload-step-2');
// var uploadStep3 = document.getElementById('upload-step-3');
// var uploadStepError = document.getElementById('upload-step-error');
// var uploadErrorText = document.getElementById('upload-error-text');
// var newUploadBtns = document.getElementsByClassName('new-upload');
// var getUpload = document.getElementById('get-upload');

// uploadForm.addEventListener('submit', function (event) {
//     event.preventDefault();
//     event.stopPropagation();

//     var formData = new FormData(uploadForm);

//     uploadStep1.classList.add('d-none');
//     uploadStep2.classList.remove('d-none');

//     fetch('/evaluate_model', {
//         method: 'POST',
//         body: formData
//     }).then(
//         response => response.json()
//     ).then(
//         json => {
//             var fitId = json.fit_id;
//             var i = setInterval(() => {
//                 fetch('/get_evaluate_status', {
//                     method: 'POST',
//                     body: JSON.stringify({ 'fit_id': fitId })
//                 }).then(
//                     response => response.json()
//                 ).then(
//                     json => {
//                         switch (json.state) {
//                             case 'SUCCESS': {
//                                 clearInterval(i);
//                                 getUpload.setAttribute('href', json.url);
//                                 uploadStep2.classList.add('d-none');
//                                 uploadStep3.classList.remove('d-none');
//                                 break;
//                             }
//                             case 'FAILURE': {
//                                 clearInterval(i);
//                                 uploadErrorText.innerText = (json.error_text);
//                                 uploadStep2.classList.add('d-none');
//                                 uploadStepError.classList.remove('d-none');
//                                 break;
//                             }
//                         };
//                     }
//                 );
//             }, 1000)
//         }
//     );

// }, false);




var uploadAgain = document.getElementById('upload-again-btn');
uploadAgain.addEventListener('click', function (event) {
    event.preventDefault();
    event.stopPropagation();
    step1.classList.remove('d-none');
    step2.classList.add('d-none');
    step3.classList.add('d-none');
    // uploadStepError.classList.add('d-none');
}, false);

// for (const btn of newUploadBtns) {
//     btn.addEventListener('click', function (event) {
//         event.preventDefault();
//         event.stopPropagation();

//         uploadStep1.classList.remove('d-none');
//         uploadStep2.classList.add('d-none');
//         uploadStep3.classList.add('d-none');
//         uploadStepError.classList.add('d-none');
//     }, false);
// };
