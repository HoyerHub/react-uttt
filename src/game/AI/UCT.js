import TreeNode from './TreeNode';
import State from '../State';

class UCT {

    getBestUCTChild = (node) => {
      if (!node.isFullyExpanded()) return null;

      let bestScore = -Number.MAX_VALUE;
      let bestNode = null;

      const childrenCount = node.children.length;
      for (let i = 0; i < childrenCount; i++){
          let exploitation = node.children[i].value / node.children[i].numVisits;
          let exploration = Math.sqrt(Math.log(node.numVisits + 1) / node.children[i].numVisits);
          let UCTScore = exploitation + this.uct_k * exploration;

          if (UCTScore > bestScore){
              bestScore = UCTScore;
              bestNode = i;
          }
      }
      return [bestNode, bestScore];
    };

    getMostVisitedChild = (node) => {
      let mostVisits = -1;
      let bestNode = null;

        const childrenCount = node.children.length;
        for (let i = 0; i < childrenCount; i++) {
            if (node.children[i].numVisits > mostVisits){
                mostVisits = node.children[i].numVisits;
                bestNode = i;
            }
        }
        return bestNode;
    };

    run = (state, timer) => {
        let rootNode = new TreeNode(state, null);
        let bestNode;
        let startTime = Date.now();

        let iterations = 0;
        while (true){
            let node = rootNode;
            while (!node.isTerminal() && node.isFullyExpanded()){
                node = node.children[this.getBestUCTChild(node)[0]];
            }
            if (!node.isFullyExpanded() && !node.isTerminal()) {
                node = node.expand();
            }
            let state = new State(node.state);
            while (!state.isTerminal) {
                let action = state.getRandomAction();
                state = state.applyAction(action[0], action[1]);
            }
            let rewards = state.evaluate();
            while (true){
                node.update(rewards);
                if (node.parent === null){
                    break;
                }
                else node = node.parent;
            }
            bestNode = this.getMostVisitedChild(node);
            iterations++;
            if (iterations > this.maxIterations || Date.now() - startTime > timer){
                console.log("MCTS finished running. Iterations: " + iterations);
                break;
            }
        }
        return [...rootNode.children[bestNode].action, (50 + 50 * this.getBestUCTChild(rootNode)[1])];
    };

    constructor(){
        this.uct_k = Math.sqrt(2);
        this.maxIterations = Number.MAX_VALUE;
    }
}
export default UCT;