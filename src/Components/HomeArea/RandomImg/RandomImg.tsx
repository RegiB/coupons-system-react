import { Component } from "react";
import "./RandomImg.css";

interface RandomImgProps {
  images: string[];
}

interface RandomImgState {
  imgSrc: string;
}

class RandomImg extends Component<RandomImgProps, RandomImgState> {
  private currItem = 0;

  public constructor(props: RandomImgProps) {
    super(props);
    this.state = {
      imgSrc: this.props.images[Math.floor(Math.random() * this.props.images.length)],
    };
  }

  public componentDidMount() {
    this.currItem = window.setInterval(() => {
      this.setState({
        imgSrc: this.props.images[Math.floor(Math.random() * this.props.images.length)],
      });
    }, 3000);
  }

  public render(): JSX.Element {
    return (
      <div className="RandomImg">
        <span>
          <img src={this.state.imgSrc}></img>
        </span>
      </div>
    );
  }

  public componentWillUnmount(): void {
    window.clearInterval(this.currItem);
  }
}

export default RandomImg;
