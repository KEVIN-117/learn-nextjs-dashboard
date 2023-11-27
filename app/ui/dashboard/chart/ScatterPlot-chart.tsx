"use client";
import { Card, ScatterChart, Text, Title } from "@tremor/react";
import {lusitana} from "@/app/ui/fonts";



export default function ScatterChartExample(){
    const chartdata = [
        {
            Country: "Argentina",
            "Life expectancy": 76.3,
            GDP: 13467.1236,
            Population: 43417765,
        },
        {
            Country: "Australia",
            "Life expectancy": 82.8,
            GDP: 56554.3876,
            Population: 23789338,
        },
        {
            Country: "Austria",
            "Life expectancy": 81.5,
            GDP: 43665.947,
            Population: 8633169,
        },
        {
            Country: "Brazil",
            "Life expectancy": 75,
            GDP: 8757.2622,
            Population: 2596218,
        },
        {
            Country: "Estonia",
            "Life expectancy": 77.6,
            GDP: 1774.9291,
            Population: 131547,
        },
        {
            Country: "Ethiopia",
            "Life expectancy": 64.8,
            GDP: 645.4637627,
            Population: 9987333,
        },
        {
            Country: "Germany",
            "Life expectancy": 81,
            GDP: 41176.88158,
            Population: 81686611,
        },
        {
            Country: "Honduras",
            "Life expectancy": 74.6,
            GDP: 2326.15856,
            Population: 896829,
        },
        {
            Country: "Italy",
            "Life expectancy": 82.7,
            GDP: 349.14755,
            Population: 673582,
        },
        {
            Country: "Lithuania",
            "Life expectancy": 73.6,
            GDP: 14252.42853,
            Population: 29491,
        },
        {
            Country: "Mexico",
            "Life expectancy": 76.7,
            GDP: 9143.128494,
            Population: 12589949,
        },
        {
            Country: "Norway",
            "Life expectancy": 81.8,
            GDP: 7455.24654,
            Population: 518867,
        },
        {
            Country: "Philippines",
            "Life expectancy": 68.5,
            GDP: 2878.33837,
            Population: 11716359,
        },
        {
            Country: "Samoa",
            "Life expectancy": 74,
            GDP: 4149.363444,
            Population: 193759,
        },
        {
            Country: "Sao Tome and Principe",
            "Life expectancy": 67.5,
            GDP: 1624.63963,
            Population: 195553,
        },
        {
            Country: "Senegal",
            "Life expectancy": 66.7,
            GDP: 98.7256145,
            Population: 14976994,
        },
        {
            Country: "Switzerland",
            "Life expectancy": 83.4,
            GDP: 89899.8424,
            Population: 8282396,
        },
        {
            Country: "Tajikistan",
            "Life expectancy": 69.7,
            GDP: 918.6771543,
            Population: 8548651,
        },
        {
            Country: "Ukraine",
            "Life expectancy": 71.3,
            GDP: 2124.662666,
            Population: 4515429,
        },
        {
            Country: "Uruguay",
            "Life expectancy": 77,
            GDP: 15524.84247,
            Population: 3431552,
        },
        {
            Country: "Zimbabwe",
            "Life expectancy": 67,
            GDP: 118.69383,
            Population: 15777451,
        },
    ];

    return (
        <div className="w-full md:col-span-4">
            <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Recent Revenue
            </h2>
            <Card>
                <Title>Life expectancy vs. GDP per capita</Title>
                <Text>As of 2015. Source: Our World in Data </Text>
                    <ScatterChart
                        className="h-80 mt-6 -ml-2"
                        yAxisWidth={50}
                        data={chartdata}
                        category="Country"
                        x="GDP"
                        y="Life_expectancy"
                        size="Population"
                        showOpacity={true}
                        minYValue={60}
                        maxYValue={90}
                        valueFormatter={{
                            x: (amount) => `$${(amount / 1000).toFixed(1)}K`,
                            y: (lifeExp) => `${lifeExp} yrs`,
                            size: (population) => `${(population / 1000000).toFixed(1)}M`,
                        }}
                        enableLegendSlider
                />
            </Card>
        </div>

    )
}