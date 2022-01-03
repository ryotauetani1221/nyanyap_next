import useImage from 'use-image';
import { Layer, Group, Rect, Stage, Image } from "react-konva";
// import Konva from 'konva';
// Konva.pixelRatio = 2;
function canvas(props) {
    const items = props.src;
    const baseHeight = 288 + 24;
    const baseWidth = 428;
    const canvasHeight = (baseHeight * items.length + 1) - 25;
    return (
        // <Stage width={(baseWidth * Math.ceil(items.length / 4)) - 24} height={(baseHeight * Math.ceil(items.length / 4)) - 25}>
        <div className='grid'>
            {
                chunk(items, 4).map((splite_item, splite_index) => {
                    return (
                        <Stage key={splite_index} width={(baseWidth)} height={(baseHeight * (splite_item.length * 1) - 25)}>
                            <Layer x={0}>
                                {
                                    splite_item.map((item, index) => {
                                        let [image, status] = useImage(item.koma.url, 'anonymous');
                                        return (
                                            <Group key={index}>
                                                <Rect fill='black' x={0} y={baseHeight * index} width={428} height={288} />
                                                <Image image={image} scale={5} x={4} y={baseHeight * index + 4} width={420} height={280} />
                                            </Group>
                                        )
                                    })
                                }
                            </Layer>
                        </Stage>
                    )
                })
            }
        </div>
        // </Stage>
    );
}

export default canvas;

function chunk<T extends any[]>(arr: T, size: number) {
    return arr.reduce(
        (newarr, _, i) => (i % size ? newarr : [...newarr, arr.slice(i, i + size)]),
        [] as T[][]
    )
}
