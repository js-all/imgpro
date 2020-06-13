const canvas = <HTMLCanvasElement> <unknown>document.getElementsByTagName("canvas")[0];
const ctx = <CanvasRenderingContext2D>canvas.getContext("2d");

const img = new Image();

const image: number[][][] = []

const srcp = "./img/thomas.jpg"//prompt("image");
if (srcp) img.src = srcp;

document.body.appendChild(img)


setTimeout(() => {
    ctx.drawImage(img, 0, 0);
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    console.log(data)
    let c = 0;
    const data2: number[][] = []
    for(let i = 0; i < data.data.length; i += 4) {
        const e1 = data.data[i];
        const e2 = data.data[i+1];
        const e3 = data.data[i+2];
        const e4 = data.data[i+3];
        data2.push([e1, e2, e3, e4])
    }
    // final data, stored in width, height, and 4 values for color r g b a
    const finalData: number[][][] = []
    for(let i = 0; i < data.width;i ++) {
        finalData.push([])
    }
    for(let i = 0; i < data2.length; i ++) {
        const widhtI = i % data.width;
        finalData[widhtI].push(data2[i]);
    }
    image.push(...finalData);
    const result = [...image];

    for (let ine = 0; ine < finalData.length; ine++) {
        const i = finalData[ine];
        for(let j = 0; i.length; j++) {
            const e = i[j]
            const e2 = i[j+1] || [0, 0, 0, 255];
            let res = [e[0] - e2[0], e[1] - e2[1], e[2] - e2[2], e[3] - e2[3]];
            res = [Math.abs(res[0]),Math.abs(res[1]),Math.abs(res[2]),Math.abs(res[3])];
            result[ine][j] = res;
        }
    }
    for(let i = 0; i < result.length; i++) {
        for(let j = 0; j < result[i].length; j ++) {
            const color = result[i][j];
            ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`;
            ctx.fillRect(i, j, 1, 1);
        }
    }

}, 1000);
