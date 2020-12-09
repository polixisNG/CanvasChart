import React, {useRef, useEffect} from 'react';
import Logo from "./images/node_avatar.png";

const Canvas = (props) => {
    const results = props.results;
    results.length = props.resultval;
    const currentLength = results.length;
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        draw(context, canvas);
    }, [draw]);

    function creatPieBorder(ctx, num) {
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = num;
        ctx.stroke();
    }

    function textStyle(ctx, textX, textY) {
        ctx.font = `900 ${27 - (currentLength)}pt Calibri`;
        ctx.fillStyle = "white";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.translate(textX, textY);
    }

    function textRotate(ctx, currentAngle) {
        if (currentLength === 1) {
            ctx.rotate(currentAngle + Math.PI / 2)
        } else if (currentLength >= 3) {
            ctx.rotate(currentAngle + (currentLength * 19 / 100));
        } else {
            ctx.rotate(currentAngle);
        }
    }

    function createCenterImageCanvas(ctx, cnv, pattern, thumbImg) {
        ctx.beginPath();
        ctx.fillStyle = pattern;
        ctx.arc(cnv.width / 2, cnv.height / 2, 125, 0, Math.PI * 2.2);  // text size
        ctx.fill();
        ctx.save();
        ctx.clip();
        ctx.drawImage(thumbImg, 50, 50, 300, 300);
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
        let total = results.reduce((sum, {narek}) => sum + narek, 0);
        let currentAngle = -0.5 * Math.PI;
        let centerX = cnv.width / 2;
        let centerY = cnv.height / 2;

        for (let result of results) {
            creatPieBorder(ctx, 3);
// ------ create pie -------
            let sliceAngle = (result.count / total) * 2 * Math.PI;
            ctx.beginPath();
            ctx.save();
            ctx.arc(centerX, centerY, 200, currentAngle, currentAngle + sliceAngle);
            currentAngle += sliceAngle;
            ctx.lineTo(centerX, centerY);
            ctx.fillStyle = result.color;
            ctx.fill();
// ------- text position
            let middleAngle = currentAngle + (-0.5 * sliceAngle);
            let textX = Math.cos(middleAngle) * 157 + centerX;
            let textY = Math.sin(middleAngle) * 157 + centerY;
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