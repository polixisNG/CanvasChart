import React, {useRef, useEffect} from 'react';
import Logo from "./images/node_avatar.png";

const Canvas = (props) => {
    const results = props.results;
    results.length = props.resultval;
    const currentResultsLength = results.length;
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        draw(context, canvas);
    }, [draw]);

    function creatPieBorder(ctx, borderLineWidth) {
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = borderLineWidth;
        ctx.stroke();
    }

    function textStyle(ctx, textX, textY) {
        let pieTextFontSize = 27;
        ctx.font = `900 ${pieTextFontSize - currentResultsLength}pt Calibri`;
        ctx.fillStyle = "white";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.translate(textX, textY);
    }

    function textRotate(ctx, currentAngle) {
        let pieFontRotatePercent = currentResultsLength * 19 / 100;
        if (currentResultsLength === 1) {
            ctx.rotate(currentAngle + Math.PI / 2)
        } else if (currentResultsLength >= 3) {
            ctx.rotate(currentAngle + pieFontRotatePercent);
        } else {
            ctx.rotate(currentAngle);
        }
    }

    function createCenterImageCanvas(ctx, cnv, pattern, thumbImg) {
        let arcRadiusSize = 125;
        let startAngle = 0;
        let endAngle = Math.PI * 2.2;
        let dx = 50;
        let dy = 50;
        let dWidth = 300;
        let dHeight = 300;
        ctx.beginPath();
        ctx.fillStyle = pattern;
        ctx.arc(cnv.width / 2, cnv.height / 2, arcRadiusSize, startAngle, endAngle);
        ctx.fill();
        ctx.save();
        ctx.clip();
        ctx.drawImage(thumbImg, dx, dy, dWidth, dHeight);
        ctx.closePath();
        ctx.restore();
        if (results.length > 0) {
            createFinishCanvas(ctx, cnv);
        }
    }

    function createFinishCanvas(ctx, cnv) {
        ctx.beginPath();
        let image = new Image();
        cnv.crossOrigin = "Anonymous";
        image.src = cnv.toDataURL("image/png");
        document.body.appendChild(image);
    }


// eslint-disable-next-line react-hooks/exhaustive-deps
    function draw(ctx, cnv) {
        let total = results.reduce((sum, {count}) => sum + count, 0);
        let currentAngle = -0.5 * Math.PI;
        let centerX = cnv.width / 2;
        let centerY = cnv.height / 2;

        for (let result of results) {
            creatPieBorder(ctx, 3);
// ------ create pie -------
            let sliceAngle = (result.count / total) * 2 * Math.PI;
            let piesChartRadiusSize = 200;
            ctx.beginPath();
            ctx.save();
            ctx.arc(centerX, centerY, piesChartRadiusSize, currentAngle, currentAngle + sliceAngle);
            currentAngle += sliceAngle;
            ctx.lineTo(centerX, centerY);
            ctx.fillStyle = result.color;
            ctx.fill();
// ------- text position
            let middleAngle = currentAngle + (-0.5 * sliceAngle);
            let pieTextPosition = 157;
            let textX = Math.cos(middleAngle) * pieTextPosition + centerX;
            let textY = Math.sin(middleAngle) * pieTextPosition + centerY;

            creatPieBorder(ctx, 2);
            textStyle(ctx, textX, textY);
            textRotate(ctx, currentAngle);
// ------ text info print
            ctx.fillText(result.keyName, 0, 0);
            ctx.restore();
        }
// ------- center image ---------
        let thumbImg = new Image();
        thumbImg.src = Logo;
        let pattern = ctx.createPattern(thumbImg, 'no-repeat');
        thumbImg.onload = function () {
            createCenterImageCanvas(ctx, cnv, pattern, thumbImg)
        }
    }

    return (
        <canvas ref={canvasRef} width={'400px'} height={'400px'}/>
    )
}

export default Canvas
