import React from 'react'
import { ResponsiveBar } from '@nivo/bar'

let hi = 0;
const Bar = ({data}) => (
    <ResponsiveBar
        /*data= {[
            {
                "expense":"Premium",
                "HDHP+Premier":  500,
                "HDHP+Standard": 500,
                "PPO+Premier": 900,
                "PPO+Standard": 850
            },
            {
                "expense":"Deductible",
                "HDHP+Premier":  500,
                "HDHP+Standard": 500,
                "PPO+Premier": 1000,
                "PPO+Standard": 850
            },
            {
                "expense":"Max Out of Pocket",
                "HDHP+Premier":  5600,
                "HDHP+Standard": 5600,
                "PPO+Premier": 7350,
                "PPO+Standard": 7350
            },
          ]}*/
        data = {data}
        keys={["HDHP+Premier","HDHP+Standard", "PPO+Premier", "PPO+Standard"]}
        indexBy="expense"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        groupMode="grouped"
        colors={{ scheme: 'pastel1' }}
        defs={[
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 4,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'PPO+Standard'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'HDHP+Standard'
                },
                id: 'lines'
            }

        ]}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 10,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Attribute',
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 2,
            tickRotation: 0,
            legend: '$ per period',
            legendPosition: 'middle',
            legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 10,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
    />
)

export default Bar