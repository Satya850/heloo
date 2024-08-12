import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <>
    <h1>different forms</h1>
    <div className="form">
      <div className="log">
        <h2>LOGIN</h2>
          <form>
            <label>Email </label>
            <input type="Email" className="fname" placeholder="Enter your email"/><br/>
            <label>Pwd  </label>
            <input type="password" className="password" placeholder="Enter password"/><br/>
            <label>captcha</label>
            <input type="captcha" className="captcha" placeholder="Enter captcha"/><br/>
            <button type="submit" value="submit">SUBMIT</button><br/>
              </form>
        </div>
        <div class="reg">
          <h2>REGISTER</h2>
          <form>
            <label>Name</label>
            <input type="text"className="fname" placeholder="Enter name"/><br/>
            <label>Email</label>
            <input type="Email"className="Email" placeholder="Enter email"/><br/>
            <label>Password</label>
            <input type="password" className="password" placeholder="enter password"/><br/>
            <label>Confirm</label>
            <input type="Confirm" className="password" placeholder="confirm password"/><br/>
            <label>Choose Country</label>
            <select>
                  <option>INDIA</option>
                  <option>UK</option>
                  <option>UAE</option>
                  <option>KOREA</option>
                  <option>USA</option>
      
            </select><br/>
                <input type="radio" className="fav_language" value="yes"/>yes
                <input type="radio" className="fav_language" value="no"/>no<br/>
            <input type=""  placeholder="Enter captcha"/>
            <label>captcha</label>
            <input type="captcha" className="captcha" placeholder="Enter data"/>
            
            <input type="checkbox" id="c" className="c" value="correct"/>Data is correct
            <button type="submit" value="REGISTER">REGISTER</button><br/>
    
    
          </form>
        </div>
      </div>
      </>
  );
}


export default App;

