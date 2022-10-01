$(document).ready(function () {
    let $body = $('body');
    let today = new Date().toLocaleDateString('id-ID');
    $('.tanggal').text(' Tanggal  : ' + today);

    $('.cards').hide();

    $('.btn_get').on('click', function () {
        let country = $('input[name=country]').val();
        if (!country) {
            alert('Harap di isi Negara dulu yaa!');
            return false;
        }

        $body.addClass('loading');
        getDataFromApi(country);
    });

    async function getDataFromApi(country) {
        let options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '',
                'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
            }
        };
        let data = await fetch(
            'https://covid-193.p.rapidapi.com/statistics?country=' + country,
            options
        );

        let response = await data.json();
        await $body.removeClass('loading');
        await setData(response);
    }

    function setData(data) {
        if (data.results > 0) {
            let datacovid = data.response[0];
            $('.negara').text('Negara : ' + datacovid.country);
            $('.benua').text('Benua : ' + datacovid.continent);
            $('.Total-kasus').text(datacovid.cases.total);
            $('.Kasus-baru').text(datacovid.cases.new);
            $('.Kasus-aktivitas').text(datacovid.cases.active);
            $('.Kasus-sembuh').text(datacovid.cases.recovered);
            $('.Total-Kematian').text(datacovid.deaths.total);
            $('.total_tests').text(datacovid.tests.total);

            $('.cards').show();
        } else {
            $('.cards').hide();
            alert('Data Kosong!');
        }
    }
});