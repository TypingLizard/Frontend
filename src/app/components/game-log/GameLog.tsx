/**
 * Noémi Feurer
 */

import React from 'react';
import "./GameLog.css"
import {VariableSizeList as List} from 'react-window';
import {Col, Container, Row} from "reactstrap";

/**
 * Component for the game log with predefined rows and columns -> database integration is coming later.
 */
const GameLog = () => {

    /**
     * The game log rows
     */
    const rows = [
        {
            id: 1,
            wpm: 25,
            accuracy: "89%",
            testType: "Normal",
            typingTime: "00:05:31"
        },
        {
            id: 2,
            wpm: 34,
            accuracy: "95%",
            testType: "Extreme",
            typingTime: "00:02:45"
        },
        {
            id: 3,
            wpm: 34,
            accuracy: "26%",
            testType: "Easy",
            typingTime: "00:01:21"
        }
    ];

    /**
     * The game log columns
     */
    const columns = [
        {
            key: "id"
        },
        {
            key: "wpm",
            label: "Wpm"
        },
        {
            key: "accuracy",
            label: "Accuracy"
        },
        {
            key: "testType",
            label: "Test type"
        },
        {
            key: "typingTime",
            label: "Typing time"
        }
    ]

    /**
     * @returns A container with the rows and columns. Database integration coming later.
     */
    return (
        <div className="statisticList">
            {/*<table className="table-container">*/}
            {/*    <thead className="logHeader">*/}
            {/*        {columns.map(column => (*/}
            {/*            <tr key={column.key}>*/}
            {/*                <th key={column.key}>{column.label}</th>*/}
            {/*            </tr>*/}
            {/*        ))}*/}
            {/*    </thead>*/}
            {/*    <tbody className="logBody">*/}
            {/*        {rows.map(row => (*/}
            {/*            <tr className="logContent" key={row.id}>*/}
            {/*                <th>{row.wpm}</th>*/}
            {/*                <th>{row.accuracy}</th>*/}
            {/*                <th>{row.testType}</th>*/}
            {/*                <th>{row.typingTime}</th>*/}
            {/*            </tr>*/}
            {/*        ))}*/}
            {/*    </tbody>*/}
            {/*</table>*/}

            <Container>
                <Row className="gameLogHeaderRow">
                    {columns.map(column => (
                        <Col key={column.key}>
                            <span>{column.label}</span>
                        </Col>
                    ))}
                </Row>
                {rows.map(row => (
                    <Row key={row.id} className="gameLogContentRow">
                        <Col key={row.id} className="gameLogContentColumn">
                            <span>{row.id}</span>
                        </Col>
                        <Col key={row.id} className="gameLogContentColumn">
                            <span>{row.wpm}</span>
                        </Col>
                        <Col key={row.id}>
                            <span>{row.accuracy}</span>
                        </Col>
                        <Col key={row.id}>
                            <span>{row.testType}</span>
                        </Col>
                        <Col key={row.id}>
                            <span>{row.typingTime}</span>
                        </Col>
                    </Row>
                ))}
            </Container>
        </div>
    );
};

export default GameLog;