import Joi from 'Joi';
import User from '../../models/user';

export const register = async ctx => {
    // 회원가입
    // Request Body 검증하기
    const schema = Joi.object().keys({
        username: Joi.string().alphanum().min(3).max(20).required(),
        password: Joi.string().required(),
    });
    const result = schema.validate(ctx.request.body);
    if(result.error) {
        ctx.status = 400;
        ctx.body = result.error;
        return;
    }
    const { username, password } = ctx.request.body;
    try {
        // username이 이미 존재하는지 확인
        const exists = await User.findByUsername(username);
        if (exists) {
            ctx.status = 409; // Conflict
            return;
        }

        const user = new User({
            username,
        });
        await user.setPassword(password); // 비밀번호 설정
        await user.save(); // DB에 저장

        // 응답할 데이터에서 hashedPassword 필드 제거
        const data = user.toJSON();
        delete data.hashedPassword;
        ctx.body = user.serialize();

        const token = user.generateToken();
        ctx.cookies.set('access_token', token, {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
            httpOnly: true,
        });
    } catch (e) {
        ctx.throw(500, e);
    }
};

export const login = async ctx => {
    const { username, password } = ctx.request.body;

    // username, password가 없으면 에러 처리
    if (!username || !password) {
        ctx.status = 401; // Unauthorized
        console.log('username 또는 pw가 없음');
        return;
    }

    try {
        const user = await User.findByUsername(username);
        // 계정이 존재하지 않으면 에러 처리
        if (!user) {
            ctx.status = 401;
            console.log('계정이 존재하지 않음');
            return;
        }
        const valid = await user.checkPassword(password);
        // 잘못된 비밀번호
        if(!valid) {
            ctx.status = 401;
            return;
        }
        ctx.body = user.serialize();

        const token = user.generateToken();
        ctx.cookies.set('access_token', token, {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
            httpOnly: true,

        //     const token = user.generateToken();
        //     ctx.cookies.set('access_token',token,{
        //     maxAge : 1000*60*60*24*7,
        //     httpOnly : true,
        });

    } catch (e) {
        ctx.throw(500, e);
    }
};

export const check = async ctx => { // 하 ㅅㅂ ,,,
    const { user } = ctx.state;

    if(!user) {
        // 로그인 중 아님
        ctx.status = 401; // Unauthorized
        console.log('로그인 중이 아님... ㅁ ㅝㅏ문젠데');
        return;
    }
    ctx.body = user;
}

export const logout = async ctx => {
    // 로그아웃
    ctx.cookies.set('access_token');
    ctx.status = 204; // No Content
};