import React from 'react';
import $ from 'jquery';
import './create-cv.scoped.css';

export class CreateCV extends React.Component {
    constructor(props) {
		super(props);
        this.addInputSkill = this.addInputSkill.bind(this);
        this.removeInputSkill = this.removeInputSkill.bind(this);
        this.addInputTech = this.addInputTech.bind(this);
        this.removeInputTech = this.removeInputTech.bind(this);
        this.addExperience = this.addExperience.bind(this);
        this.removeExperience = this.removeExperience.bind(this);
	}

    addInputSkill() {
        var new_input = "<li style='margin: 6px 6px 0 0' className='newInputSkill' id='newInputSkill'><input type='text' placeholder='Kĩ năng'></li>";
        $('#skills').append(new_input);
    } 

    removeInputSkill() {
        $('#newInputSkill').remove();
    } 

    addInputTech() {
        var new_input = "<li style='margin: 6px 6px 0 0' className='newInputTech' id='newInputTech'><input type='text' placeholder='Kĩ năng'></li>";
        $('#technologies').append(new_input);
    } 

    removeInputTech() {
        $('#newInputTech').remove();
    } 

    addExperience() {
        var new_input = "<li id='newExperience'><input type='text' name='newExperience'  placeholder='Tên công việc'></input><textarea id='w3review' name='w3review' rows='4' cols='70' placeholder='Mô tả'></textarea></li>";
        $('#experience').append(new_input);
    }

    removeExperience() {
        $('#newExperience').remove();
    }

render() {
    return (
        <form>
            
        <section id="save">
        <section class="sheet">
            <aside style={{width: "30%"}}>
                <section class="contact">
                    <h6>Contact</h6>
                    <ul>
                        <li>
                            <span><i class="fa fa-map-marker-alt" title="Location"></i></span>
                            <input type="text" name="address" id="address" placeholder="Địa chỉ"></input>
                        </li>
                        <li>
                            <span><i class="fa fa-phone" title="Cell phone"></i></span>
                            <input type="text" name="phone" id="phone" placeholder="SĐT"></input>
                        </li>
                        <li>
                            <span><i class="fa fa-envelope" title="Email"></i></span>
                            <input type="text" name="email" id="email" placeholder="Email"></input>
                        </li>
                        <li>
                            <span><i class="fa fa-globe-americas" title="Website"></i></span>
                            <input type="text" name="web" id="web" placeholder="Website"></input>
                        </li>
                        <li>
                        <span><i class="fa fa-github" title="Github"></i></span>
                            <input type="text" name="github" id="github" placeholder="Github"></input>
                        </li>
                    </ul>
                </section>
                        <section class="skills">
                            <h6>Skills</h6>
                            <ul id="skills">
                            </ul>
                            <li style={{margin: "6px 6px 0 0"}} className='newInputSkill' id='newInputSkill'><input type="text" placeholder="Kĩ năng"></input></li>
                            <ul>
                                <li onClick={this.addInputSkill}><span>+</span></li>
                                <li onClick={this.removeInputSkill}><span>-</span></li>
                            </ul>
                        </section>
                <section class="skills">
                    <h6>Technologies</h6>
                    <ul id ="technologies">
                        
                    </ul>
                    <li style={{margin: "6px 6px 0 0"}} className='newInputTech' id='newInputTech'><input type="text" placeholder="Kĩ năng"></input></li>
                            <ul>
                                <li onClick={this.addInputTech}><span>+</span></li>
                                <li onClick={this.removeInputTech}><span>-</span></li>
                            </ul>
                </section>
                <section class="references">
                    <h6>References</h6>
                    <address>
                        Jane Doe<br />
                        Alphabet Inc.<br />
                        (413) 025-1900
                        jane@janedoe.site
                    </address>
                    <address>
                        Luke O'Connor<br />
                        Facebook<br />
                        (413) 125-1400
                        luke@facebook.site
                    </address>
                    <p>Typeset in HTML &amp; CSS<br />
                    See <a href="https://git.io/f4dXp">git.io/f4dXp</a></p>
                </section>
            </aside>
            <section style={{width: "70%"}}>
                        <header class="name" aria-label="Joe Smith">
                            <label>
                                <input type="text" name="username" id="username" placeholder="Tên"></input>
                            </label>
                            <h6>
                            <input type="text" name="position" id="position" placeholder="Vị trí ứng tuyển"></input>
                                </h6>
                            <hr />
                        </header>
                <section>
                    <section class="summary">
                        <h6>Summary</h6>
                        <textarea id="w3review" name="w3review" rows="4" cols="70" placeholder="Giới thiệu"></textarea>
                    </section>
                    <section class="experience">
                        <h6>Experience</h6>
                        <ol id='experience'>
                                    <li id="newExperience">
                                        <input type="text" name="newExperience"  placeholder="Tên công việc"></input>
                                        <textarea id="w3review" name="w3review" rows="4" cols="70" placeholder="Mô tả"></textarea>
                                    </li>
                                   
                        </ol>
                                <ul>
                                    <li onClick={this.addExperience}><span>+</span></li>
                                    <li onClick={this.removeExperience}><span>-</span></li>
                                </ul>
                    </section>
                    <section class="education">
                        <h6>Education</h6>
                        <ol>
                            <li>
                            <textarea id="w3review" name="w3review" rows="4" cols="70" placeholder="Mô tả"></textarea>
                            </li>
                            
                        </ol>
                    </section>
                </section>
            </section>
        </section>
    </section>
    </form>
    )
}
}