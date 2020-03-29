import React, { Component } from 'react';
import { ResponsiveBar } from '@nivo/bar';


class Bar extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            selected: "HDPD Premier"
        };
    }

    render() {
        return (
            <ResponsiveBar
                data = {this.props.data}
                keys={["HDHP Premier","HDHP Standard", "PPO Premier", "PPO Standard"]}
                indexBy="expense"
                margin={{ top: 25, right: 130, bottom: 50, left: 60 }}
                padding={0.3}
                groupMode="grouped"
                colors={this.props.colors}
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
                /*
                fill={[
                    {
                        match: {
                            id: 'PPO Standard'
                        },
                        id: 'lines'
                    },
                    {
                        match: {
                            id: 'HDHP Standard'
                        },
                        id: 'lines'
                    }

                ]}*/
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
                onClick={(node) => this.props.updatePlan(node.id)}
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
                        symbolSize: 20,
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
        />);
    }
}

export default Bar