import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Popover, PopoverBody, PopoverHeader } from 'reactstrap';

interface PopOverItemState {
  popoverOpen: boolean;
}

interface Props {
  item: {
    text?: string;
    placement?: string;
  };
  id: number;

}

class PopoverItem extends Component<Props, PopOverItemState> {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      popoverOpen: false,
    };
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen,
    });
  }

  render() {
    return (
      <span>
        <Button className="mr-1" color="secondary" id={'Popover-' + this.props.id} onClick={this.toggle}>
          {this.props.item.text}
        </Button>
        <Popover placement={this.props.item.placement} isOpen={this.state.popoverOpen} target={'Popover-' + this.props.id} toggle={this.toggle} trigger="legacy" delay={0}>
          <PopoverHeader>Popover Title</PopoverHeader>
          <PopoverBody>Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.</PopoverBody>
        </Popover>
      </span>
    );
  }
}


interface PopOverState {
  popoverOpen: boolean;
  popovers: object[]
}

class Popovers extends Component<{}, PopOverState> {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      popoverOpen: false,
      popovers: [
        {
          placement: 'top',
          text: 'Top',
        },
        {
          placement: 'bottom',
          text: 'Bottom',
        },
        {
          placement: 'left',
          text: 'Left',
        },
        {
          placement: 'right',
          text: 'Right',
        },
      ],
    };
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen,
    });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify"></i><strong>Popovers</strong>
            <div className="card-header-actions">
              <a href="https://reactstrap.github.io/components/popovers/" rel="noreferrer noopener" target="_blank" className="card-header-action">
                <small className="text-muted">docs</small>
              </a>
            </div>
          </CardHeader>
          <CardBody>
            <Button id="Popover1" onClick={this.toggle}>
              Launch Popover
            </Button>
            <Popover placement="bottom" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.toggle}>
              <PopoverHeader>Popover Title</PopoverHeader>
              <PopoverBody>Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.</PopoverBody>
            </Popover>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <i className="fa fa-align-justify"></i><strong>Popovers</strong>
            <small> list</small>
          </CardHeader>
          <CardBody>
            {this.state.popovers.map((popover, i) => {
              return <PopoverItem key={i} item={popover} id={i} />;
            })}
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Popovers;
