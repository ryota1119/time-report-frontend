"use client"

import {AnimatePresence, motion} from "motion/react"
import {useState} from "react"

export default function SamplePage() {
    const steps = [1, 2, 3];
    const [currentStep, setCurrentStep] = useState(steps[0]);

    const handleNextClick = () => {
        setCurrentStep(currentStep + 1)
        console.log(currentStep)
    }

    const handlePrevClick = () => {
        setCurrentStep(currentStep - 1)
    }

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <motion.div
                        key="blue"
                        initial={{opacity: 1, x: 0}}
                        animate={{opacity: 1, x: 0}}
                        exit={{opacity: 0, x: 150}}
                        transition={{duration: 0.3}}
                        style={box_blue}
                    >
                        <input type="text"/>
                    </motion.div>
                );
            case 2:
                return (
                    <motion.div
                        key="red"
                        initial={{opacity: 0, x: -150}}
                        animate={{opacity: 1, x: 0}}
                        exit={{opacity: 0, x: 150}}
                        style={box_red}
                        transition={{duration: 0.3}}
                    >
                        <input type="text"/>
                    </motion.div>
                );
            case 3:
                return (
                    <motion.div
                        key="green"
                        initial={{opacity: 0, x: -150}}
                        animate={{opacity: 1, x: 0}}
                        exit={{opacity: 0, x: 150}}
                        style={box_green}
                        transition={{duration: 0.3}}
                    >
                        <input type="text"/>
                    </motion.div>
                )
            default:
                return null;
        }
    }

    return (
        <div style={container}>
            <AnimatePresence initial={false}>
                {renderStep()}
            </AnimatePresence>
            <motion.button
                style={button}
                onClick={() => handleNextClick()}
                whileTap={{y: 1}}
            >
                次
            </motion.button>
            <motion.button
                style={button}
                onClick={() => handlePrevClick()}
                whileTap={{y: 1}}
            >
                前
            </motion.button>
        </div>
    )
}

/**
 * ==============   Styles   ================
 */

const container: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    width: 100,
    height: 160,
    position: "relative",
    overflow: "hidden",
}

const box_blue: React.CSSProperties = {
    width: 100,
    height: 100,
    backgroundColor: "blue",
    borderRadius: "10px",
    position: "absolute",
    top: 0,
    left: 0,
}

const box_red: React.CSSProperties = {
    width: 100,
    height: 100,
    backgroundColor: "red",
    borderRadius: "10px",
    position: "absolute",
    top: 0,
    left: 0,
}

const box_green: React.CSSProperties = {
    width: 100,
    height: 100,
    backgroundColor: "green",
    borderRadius: "10px",
    position: "absolute",
    top: 0,
    left: 0,
}

const button: React.CSSProperties = {
    backgroundColor: "#0cdcf7",
    borderRadius: "10px",
    padding: "10px 20px",
    color: "#0f1115",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
}
