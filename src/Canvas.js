import React, {useEffect, useRef} from 'react'
import Logo from "./images/node_avatar.png"

const Canvas = (props) => {
    const results = props.results
    results.length = props.resultval
    const currentResultsLength = results.length
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        draw(context, canvas)
    }, [draw])

// eslint-disable-next-line react-hooks/exhaustive-deps
    function draw(ctx, canvas) {
        let total = results.reduce((sum, {count}) => sum + count, 0)
        let currentAngle = -0.5 * Math.PI
        let centerX = canvas.width / 2
        let centerY = canvas.height / 2

        function creatPieBorder(ctx, borderLineWidth) {
            ctx.strokeStyle = "#ffffff"
            ctx.lineWidth = borderLineWidth
            ctx.stroke()
        }

        function textStyle(ctx, textX, textY) {
            let pieTextFontSize = 27
            ctx.font = `900 ${pieTextFontSize - currentResultsLength}pt Calibri`
            ctx.fillStyle = "white"
            ctx.textBaseline = "middle"
            ctx.textAlign = "center"
            ctx.translate(textX, textY)
        }

        function textRotate(ctx, currentAngle) {
            let pieFontRotatePercent = currentResultsLength * 19 / 100
            if (currentResultsLength === 1) {
                ctx.rotate(currentAngle + Math.PI / 2)
            } else if (currentResultsLength >= 3) {
                ctx.rotate(currentAngle + pieFontRotatePercent)
            } else {
                ctx.rotate(currentAngle)
            }
        }

        function createCenterImageCanvas(ctx, canvas, griCodesImg) {
            let arcRadiusSize = 130
            let startAngle = 0
            let endAngle = Math.PI * 2.2
            let drawX = 60
            let drawY = 60
            let dWidth = 280
            let dHeight = 280
            ctx.beginPath()
            ctx.arc(canvas.width / 2, canvas.height / 2, arcRadiusSize, startAngle, endAngle)
            ctx.fill()
            ctx.save()
            ctx.clip()
            ctx.drawImage(griCodesImg, drawX, drawY, dWidth, dHeight)
            ctx.closePath()
            ctx.restore()
            if (results.length > 0) {
                createFinishCanvas(ctx, canvas)
            }
        }

        function createFinishCanvas(ctx, cnv) {
            ctx.beginPath()
            let image = new Image()
            cnv.crossOrigin = "Anonymous"
            image.src = cnv.toDataURL("image/png")
            document.body.appendChild(image)
        }

        for (let result of results) {
            creatPieBorder(ctx, 3)
// ------ create pie -------
            let sliceAngle = (result.count / total) * 2 * Math.PI
            let piesChartRadiusSize = 200
            ctx.beginPath()
            ctx.save()
            ctx.arc(centerX, centerY, piesChartRadiusSize, currentAngle, currentAngle + sliceAngle)
            currentAngle += sliceAngle
            ctx.lineTo(centerX, centerY)
            ctx.fillStyle = result.color
            ctx.fill()
// ------- text position
            let middleAngle = currentAngle + (-0.5 * sliceAngle)
            let pieTextPosition = 160
            let textX = Math.cos(middleAngle) * pieTextPosition + centerX
            let textY = Math.sin(middleAngle) * pieTextPosition + centerY

            creatPieBorder(ctx, 2)
            textStyle(ctx, textX, textY)
            textRotate(ctx, currentAngle)
// ------ text info print
            ctx.fillText(result.keyName, 0, 0)
            ctx.restore()
        }
// ------- center image ---------
        let griCodesImg = new Image()
        griCodesImg.src = Logo
        // ctx.fillStyle = ctx.createPattern(griCodesImg, 'no-repeat')
        griCodesImg.onload = function () {
            createCenterImageCanvas(ctx, canvas, griCodesImg)
        }
    }

    return <canvas ref={canvasRef} width={'400px'} height={'400px'}/>
}
export default Canvas