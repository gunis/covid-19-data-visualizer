$(function () {
	var worldSelector = '#world';
	var worldElement = $(worldSelector);
	var chartWorldTotalCases = [];
	var chartWorldActiveCases = [];
	var tableData = [];
	var lastDataUpdate;

	$("#last-data-update-alert").hide();
	$.ajax({
		url: "https://covid-19.dataflowkit.com/v1"
	}).done(function(countries) {
		worldElement.html('');
		worldElement.append(
			'<table id="countries-data" class="table table-bordered"></table>'
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
				
				tableData.push([
					countryName,
					totalCases,
					activeCases,
					newCases,
					newDeaths,
					totalDeaths,
					totalRecovered
				]);
			}
			else if (typeof country['Country_text'] !== 'undefined' && country['Country_text'] === 'World') {
				lastDataUpdate = country['Last Update'];
			}
		});

		$('#countries-data').DataTable({
			"columns": [
				{ "title": "Country"},
				{ "title": "Total cases"},
				{ "title": "Active cases"},
				{ "title": "New cases"},
				{ "title": "New deaths"},
				{ "title": "Total deaths"},
				{ "title": "Total recovered"}
			],
			"data": tableData,
			"lengthMenu": [[25, 50, 100, -1], [25, 50, 100, "All"]],
			"order": [[ 1, "desc" ]]
		});

		Highcharts.chart('chart-world-total-cases', {
			chart: {
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false,
				type: 'pie',
				backgroundColor: 'rgba(0,0,0,0)'
			},
			title : {
				text: null,
				style : {
					display : 'none'
				}
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
			title : {
				text: null,
				style : {
					display : 'none'
				}
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

		$('#last-data-update').text(lastDataUpdate);
		$("#last-data-update-alert").fadeTo(2000, 500).slideUp(500, function(){
			$("#last-data-update-alert").slideUp(500);
		});
	});
});