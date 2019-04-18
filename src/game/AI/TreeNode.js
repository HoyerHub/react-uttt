import Helpers from '../Tools/Helpers';
import State from "../State";

class TreeNode {

    isFullyExpanded = () =>{
        return this.children.length > 0 && this.children.length === this.actions.length;
    };

    isTerminal = () => {
        return this.state.isTerminal;
    };
v
    applyAction = () => {
        this.state.applyAction(this.action[0], this.action[1]);
    };

    addChildWithAction = (action) =>{
      let child = new TreeNode(this.state, this);
      child.action = action;
      child.applyAction();
      this.children.push(child);
      return child;
    };

    expand = () => {
        if (this.isFullyExpanded()) return null;

        if (this.actions.length === 0){
            this.actions = this.state.getActions();
            Helpers.shuffle(this.actions);
        }
        return this.addChildWithAction(this.actions[this.children.length]);
    };

    update = (rewards) => {
        this.value += rewards[this.player];
        this.numVisits++;
    };

    constructor(state, parent){
        this.state = new State(state);
        this.action = null;
        this.parent = parent;
        this.player = state.currentPlayer;
        if (parent === null) this.root = this;
        else this.root = parent.root;
        this.numVisits = 0;
        this.value = 0;
        this.depth = parent !== null ? parent.depth + 1 : 0;

        this.children = [];
        this.actions = [];
    }
}
export default TreeNode;