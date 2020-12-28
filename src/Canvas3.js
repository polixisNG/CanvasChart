import React, {useEffect, useRef} from 'react';
import Logo from "./images/node_avatar.png";

const CanvasSecond = (props) => {

    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        draw(context, canvas);
    }, [draw]);

    const results = props.results;
    results.length = props.resultval;
    const currentLength = results.length;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    function draw(ctx, cnv) {

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 140;
        canvas.height = 140;

        if (Utils.isNotNullOrUndefined(pies) || pies.length) {

            let total = pies.reduce((sum, {count}) => sum + count, 0);
            let currentAngle = Math.PI / 2;
            let centerX = canvas.width / 2;
            let centerY = canvas.height / 2;

            for (let result of pies) {
                if (pies.length > 1) {
                    Utils.creatPieBorder(ctx, 3);
                }
                let sliceAngle = (result.count / total) * 2 * Math.PI; // create pie
                let piesChartRadiusSize = canvas.width / 2;
                ctx.beginPath();
                ctx.save();
                ctx.arc(centerX, centerY, piesChartRadiusSize, currentAngle, currentAngle + sliceAngle);
                ctx.lineTo(centerX, centerY);
                ctx.fillStyle = result.color;
                ctx.fill();
                currentAngle += sliceAngle;
                let middleAngle = currentAngle + (-0.5 * sliceAngle);
                let pieTextPosition = 8 * (canvas.width / 100);
                let textX = Math.cos(middleAngle) * pieTextPosition + centerX;
                let textY = Math.sin(middleAngle) * pieTextPosition + centerY;
                // let cText = result.text.split("").join(String.fromCharCode(8201)); // latter spacing
                if (pies.length > 1) {
                    Utils.creatPieBorder(ctx, 3);
                }
                Utils.textStyle(ctx, textX, textY, pies.length);
                Utils.textRotate(ctx, currentAngle, pies.length);
                // ctx.fillText(result.text, 0, 0);
                Utils.drawTextAlongArc(ctx, result.text, textX, textY, 45, currentAngle);

                ctx.restore();
            }
        } else {
            canvas.width = 180;
            canvas.height = 180;
            ctx.save();
            ctx.beginPath();
            ctx.arc(0, 0, 140, 0, 140);
            ctx.drawImage(img, 0, 0, 140, 140);
        }
        Utils.createCenterImageCanvas(ctx, canvas, img);
        let canvasUrl = '';
        canvasUrl = canvas.toDataURL();
        return canvasUrl;
    }

,

    drawTextAlongArc: (ctx, str, textX, textY, radius, angle) => {
        angle = angle / 5;
        ctx.save();
        // ctx.translate(textX, textY);
        ctx.rotate(-1 * angle / 2);
        ctx.rotate(-1 * (angle / str.length) / 2);
        for (let n = 0; n < str.length; n++) {
            ctx.rotate(angle / str.length);
            ctx.save();
            ctx.translate(0, -1 * radius);
            ctx.fillText(str[n], 0, 0);
            ctx.restore(angle / str.length);
        }
        ctx.restore();
    },
        createCenterImageCanvas
:
    (ctx, canvas, avatarImg) => {
        let arcRadiusSize = 32 * canvas.width / 100;
        let startAngle = 0;
        let endAngle = Math.PI * 2.2;
        let drawX = 17 * canvas.width / 100;
        let drawY = 17 * canvas.width / 100;
        let dWidth = 66 * canvas.width / 100;
        let dHeight = 66 * canvas.width / 100;
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.width / 2, arcRadiusSize, startAngle, endAngle);
        ctx.fill();
        ctx.save();
        ctx.clip();
        ctx.drawImage(avatarImg, drawX, drawY, dWidth, dHeight);
        ctx.closePath();
    },
        creatPieBorder
:
    (ctx, borderLineWidth) => {
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = borderLineWidth;
        ctx.stroke();
    },
        textStyle
:
    (ctx, textX, textY, len) => {
        ctx.font = `11pt Calibri`;
        ctx.fillStyle = "#ffffff";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.translate(textX, textY);
    },
        textRotate
:
    (ctx, currentAngle, len) => {
        let pieFontRotatePercent = len * 19 / 100;
        if (len === 1) {
            ctx.rotate(currentAngle + (3 * Math.PI / 2));
        } else if (len === 2) {
            ctx.rotate(currentAngle);
        } else {
            ctx.rotate(currentAngle + pieFontRotatePercent);
        }
    }
}

return (
    <canvas ref={canvasRef} width={'250px'} height={'250px'}/>
)
}

export default CanvasSecond