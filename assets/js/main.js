$(function () {
	var worldSelector = '#world';
	var worldElement = $(worldSelector);
	var chartWorldTotalCases = [];
	var chartWorldActiveCases = [];

	$.ajax({
		url: "https://covid-19.dataflowkit.com/v1"
	}).done(function(countries) {
		worldElement.html('');
		worldElement.append(
			'<table class="table table-bordered">' +
			'  <thead>' +
			'	<tr>' +
			'	  <th>Country</th>' +
			'	  <th>Total cases</th>' +
			'	  <th>Active cases</th>' +
			'	  <th>New cases</th>' +
			'	  <th>New deaths</th>' +
			'	  <th>Total deaths</th>' +
			'	  <th>Total recovered</th>' +
			'	</tr>' +
			'  </thead>' +
			'  <tbody/>' +
			'</table>'
		);
		$.each(countries, function(index, country) {
			if (typeof country['Country_text'] !== 'undefined' && country['Country_text'] !== 'World') {
				var countryName = country['Country_text'];
				var totalCases = country['Total Cases_text'];
				var activeCases = country['Active Cases_text'];
				var newCases = country['New Cases_text'];
				var newDeaths = country['New Deaths_text'];
				var totalDeaths = country['Total Deaths_text'];
				var totalRecovered = country['Total Recovered_text'];

				if (totalCases !== 'N/A') {
					chartWorldTotalCases.push({
						name: countryName,
						y: Number(totalCases. replace(/,/g, '')),
					});
				}

				if (activeCases !== 'N/A') {
					chartWorldActiveCases.push({
						name: countryName,
						y: Number(activeCases. replace(/,/g, '')),
					});
				}
				

				worldElement.find('table tbody').append(
					'<tr>' +
					'  <td class="text-left">' + countryName + '</td>' +
					'  <td class="text-right">' + totalCases + '</td>' +
					'  <td class="text-right">' + activeCases + '</td>' +
					'  <td class="text-right">' + newCases + '</td>' +
					'  <td class="text-right">' + newDeaths + '</td>' +
					'  <td class="text-right">' + totalDeaths + '</td>' +
					'  <td class="text-right">' + totalRecovered + '</td>' +
					'</tr>'
				);
			}
		});

		Highcharts.chart('chart-world-total-cases', {
			chart: {
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false,
				type: 'pie',
				backgroundColor: 'rgba(0,0,0,0)'
			},
			title: {
				text: 'Total cases'
			},
			tooltip: {
				pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
			},
			accessibility: {
				point: {
					valueSuffix: '%'
				}
			},
			plotOptions: {
				pie: {
					dataLabels: {
						enabled: true,
						format: '<b>{point.name}</b>: {point.percentage:.1f} %'
					}
				}
			},
			credits: {
				enabled: false
			},
			series: [{
				name: 'Percentage',
				showInLegend: false,
				colorByPoint: true,
				data: chartWorldTotalCases
			}]
		});

		Highcharts.chart('chart-world-active-cases', {
			chart: {
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false,
				type: 'pie',
				backgroundColor: 'rgba(0,0,0,0)'
			},
			title: {
				text: 'Active cases'
			},
			tooltip: {
				pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
			},
			accessibility: {
				point: {
					valueSuffix: '%'
				}
			},
			plotOptions: {
				pie: {
					dataLabels: {
						enabled: true,
						format: '<b>{point.name}</b>: {point.percentage:.1f} %'
					}
				}
			},
			credits: {
				enabled: false
			},
			series: [{
				name: 'Percentage',
				showInLegend: false,
				colorByPoint: true,
				data: chartWorldActiveCases
			}]
		});
	});
});