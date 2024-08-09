import React, { Component } from 'react'
import CountUp from "react-countup";
import ScrollTrigger from 'react-scroll-trigger'

export class Statistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            counterOn: false
        };
    }

    render() {
        const achievementsList = [
            [1000, 2000, "Students have taken DYS course along with Holy Name (Hare Krishna Mahamantra)"], 
            [0, 150, "Students Leaders have undergone disciplinary training in VOICE"], 
            [2000, 5000, "Students have received Bhagavad Gita"],
            [0, 200, "Courses Conducted (Personality Development, Software Training, Soft Skill Training) "],
            [0, 18, "successful YEARS educating youths of NIT Jamshedpur"],
            [0, 150, "Colleges Network all over India"],
            [0, 25, "Active Members getting trained in Self Development"]
        ];
        const achievements = achievementsList.map((ele)=>{
            return (
                <div>
                    <h1>
                        {this.state.counterOn &&
                            <CountUp start={ele[0]} end={ele[1]} duration={3} delay={0} />
                        }+
                    </h1>
                    <h6>{ele[2]}</h6>
                    <hr />
                </div>
            )
        })
        return (
            <div className='right-panel-statistics'>
                <ScrollTrigger onEnter={() => this.setState({ counterOn: true })} onExit={() => this.setState({ counterOn: false })}>
                    <div className='statistics'>
                        <h4>OUR ACHIEVEMENTS</h4>
                        <hr/>
                        {achievements}                        
                    </div>
                </ScrollTrigger >
            </div >
        )
    }
}

export default Statistics
