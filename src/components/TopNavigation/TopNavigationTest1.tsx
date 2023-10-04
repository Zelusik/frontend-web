import React from "react";
import {
  CDBNav,
  CDBTabLink,
  CDBTabContent,
  CDBTabPane,
  CDBContainer,
} from "cdbreact";
import { NavLink } from "react-router-dom";

const Tab = () => {
  return (
    <CDBContainer>
      <CDBContainer>
        <CDBNav className="nav-tabs mt-5">
          <CDBTabLink
            link
            to="#"
            active={this.state.activeItem === "1"}
            onClick={this.toggle("1")}
            role="tab"
          >
            Label 1
          </CDBTabLink>

          <CDBTabLink
            link
            to="#"
            active={this.state.activeItem === "2"}
            onClick={this.toggle("2")}
            role="tab"
          >
            Label 2
          </CDBTabLink>
          <CDBTabLink
            link
            to="#"
            active={this.state.activeItem === "3"}
            onClick={this.toggle("3")}
            role="tab"
          >
            Label 3
          </CDBTabLink>
        </CDBNav>
        <CDBTabContent activeItem={this.state.activeItem}>
          <CDBTabPane tabId="1" role="tabpanel">
            <p className="mt-2">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil
              odit magnam minima, soluta doloribus reiciendis molestiae placeat
              unde eos molestias. Quisquam aperiam, pariatur. Tempora, placeat
              ratione porro voluptate odit minima.
            </p>
          </CDBTabPane>
          <CDBTabPane tabId="2" role="tabpanel">
            <p className="mt-2">
              Quisquam aperiam, pariatur. Tempora, placeat ratione porro
              voluptate odit minima. Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Nihil odit magnam minima, soluta doloribus
              reiciendis molestiae placeat unde eos molestias.
            </p>
            <p>
              Quisquam aperiam, pariatur. Tempora, placeat ratione porro
              voluptate odit minima. Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Nihil odit magnam minima, soluta doloribus
              reiciendis molestiae placeat unde eos molestias.
            </p>
          </CDBTabPane>
          <CDBTabPane tabId="3" role="tabpanel">
            <p className="mt-2">
              Quisquam aperiam, pariatur. Tempora, placeat ratione porro
              voluptate odit minima. Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Nihil odit magnam minima, soluta doloribus
              reiciendis molestiae placeat unde eos molestias.
            </p>
          </CDBTabPane>
        </CDBTabContent>
      </CDBContainer>
    </CDBContainer>
  );
};
export default Tab;
