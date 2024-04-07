class LampFluid {
    constructor(blurIntensity, blobThreshold, boundingRectGrowth) {
        this.blurIntensity = blurIntensity;
        this.blobThreshold = blobThreshold;
        this.boundingRectGrowth = boundingRectGrowth;

        this.blobs = [];
        this.blobLayer = createGraphics(width, height);
    }

    update() {
        for (let blob of this.blobs) {
            blob.move();
        }
    }


    applyFilter(pixels, blobBuffer, boundingRect, threshold=100, mask=undefined) {
        blobBuffer.loadPixels();
        const offsetX = boundingRect.x;
        const offsetY = boundingRect.y;
    
        for (let x = 0; x < blobBuffer.width; x++) {
            for (let y = 0; y < blobBuffer.height; y++) {
                const bufferIndex = (x + y * blobBuffer.width) * 4;
                const brightnessValue = blobBuffer.pixels[bufferIndex];
                const pixelIndex = ((x + offsetX) + (y + offsetY) * width) * 4;
    
                if (brightnessValue < threshold) {
                    pixels[pixelIndex] = 255;
                    pixels[pixelIndex + 1] = 100;
                    pixels[pixelIndex + 2] = 0;
                    pixels[pixelIndex + 3] = 255;
                }
                else if (brightnessValue < threshold * 1.5) {
                    pixels[pixelIndex] = 255;
                    pixels[pixelIndex + 1] = 255;
                    pixels[pixelIndex + 2] = 0;
                    let alpha = map(brightnessValue, 0, 255, 0.5, 0);
                    pixels[pixelIndex + 3] = alpha * 255;
                }

                const maskBrightnessValue = mask.pixels[pixelIndex];
                let multiplier = map(maskBrightnessValue, 0, 255, 0, 1)
                pixels[pixelIndex + 3] *= multiplier;
            }
        }
    }

    shiftBlobs(boundingRect) {
        return this.blobs.map(blob => {
            return {
                ...blob,
                x: blob.x - boundingRect.x,
                y: blob.y - boundingRect.y
            }
        });
    }
    
    drawToBuffer(blobBuffer, blobs) {
        blobBuffer.background(255);
        blobBuffer.drawingContext.filter = `blur(${this.blurIntensity}px)`;

        blobBuffer.fill(0);
        for (let blob of blobs) {
            blobBuffer.ellipse(blob.x, blob.y, blob.radius, blob.radius);
        }
    }

    getBoundingRect(growthFactor=0) {
        let minX = Infinity;
        let maxX = -1;
        let minY = Infinity;
        let maxY = -1;
    
        for (let blob of this.blobs) {
            if (blob.x + blob.radius / 2 > maxX)
                maxX = blob.x + floor(blob.radius / 2);
            if (blob.x - blob.radius / 2 < minX)
                minX = blob.x - floor(blob.radius / 2);
    
            if (blob.y + blob.radius / 2 > maxY)
                maxY = blob.y + floor(blob.radius / 2);
            if (blob.y-  blob.radius / 2  < minY)
                minY = blob.y - floor(blob.radius / 2 );
        }
    
        return {
            x: minX - floor(growthFactor / 2),
            y: minY - floor(growthFactor / 2),
            width: maxX - minX + growthFactor,
            height: maxY - minY + growthFactor
        }
    }

    drawBR(br) {
        push();
        noFill();
        strokeWeight(2);
        stroke(0, 255, 0)
        rect(br.x, br.y, br.width, br.height)
        pop();
    }

    addBlob(x, y, r) {
        this.blobs.push(new Blob(x, y, r));
    }

    draw(mask=undefined) {
        const br = this.getBoundingRect(this.boundingRectGrowth);
        // this.drawBR(br)
        const buffer = createGraphics(br.width, br.height);
        this.drawToBuffer(buffer, this.shiftBlobs(br))
    
        this.blobLayer.clear()
        this.blobLayer.loadPixels();
        mask.loadPixels()
        this.applyFilter(this.blobLayer.pixels, 
                         buffer, 
                         br, 
                         this.blobThreshold, 
                         mask);
        this.blobLayer.updatePixels();

        image(this.blobLayer, 0, 0)
    }
}